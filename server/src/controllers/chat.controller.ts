import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import prisma from "../prisma/src";
import { embeddings, openai } from "../openai";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import authMiddleware from "../middleware/middleware";

const router = require("express").Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.use(authMiddleware);

router.post(
  "/api/upload-sources",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file;
      const name = req.body.name;
      console.log(name, "asdadasdasdasd");

      if (!file) {
        res.status(400).json({ error: "No file provided" });
        return;
      }

      if (!process.env.OPENAI_API_KEY) {
        res.status(500).json({ error: "Missing OpenAI API key" });
        return;
      }

      const loader = new PDFLoader(path.join(uploadDir, file.filename));
      const docs = await loader.load();

      let project;

      project = await prisma.project.findFirst({
        where: { userId: req.user!.id },
      });

      if (!project) {
        project = await prisma.project.create({
          data: {
            name,
            userId: req.user!.id,
          },
        });
      }

      for (const doc of docs) {
        const embedding = await embeddings.embedQuery(doc.pageContent);
        console.log("Embedding:", docs[0].metadata);
        const page = await prisma.page.create({
          data: {
            content: doc.pageContent,
            metadata: JSON.stringify(doc.metadata),
            projectId: project.id,
          },
        });

        await prisma.$executeRaw`
        UPDATE "Page"
          SET "vector" = ${embedding}::vector
          WHERE "id" = ${page.id}
        `;
      }

      console.log("File received and processed:", file.filename);
      res.status(200).json({
        message: "File uploaded and vectorized successfully",
        filename: file.filename,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post("/api/query-sources", async (req: Request, res: Response) => {
  const query = req.body.query;
  const projectId = req.body.projectId;

  const project = await prisma.project.findUnique({
    where: { id: projectId, userId: req.user!.id },
    include: {
      pages: true,
    },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const queryEmbedding = await embeddings.embedQuery(query);
  const results = await prisma.$queryRaw`
    SELECT "Page"."id", "Page"."metadata", "Page"."content", "Page"."projectId",
        "Page"."createdAt", "Page"."updatedAt",
        "Page"."vector" <-> ${queryEmbedding}::vector AS distance
    FROM "Page"
    WHERE "Page"."projectId" = ${projectId}
    ORDER BY distance ASC
    LIMIT 5;
`;
  //@ts-ignore
  if (results.length === 0) {
    res.status(404).json({ error: "No results found" });
    return;
  }

  //@ts-ignore
  for (const result of results) {
    result.metadata = JSON.parse(result.metadata);
  }

  //@ts-ignore
  const contextText = results.map((result) => result.content).join("\n\n");
  const prompt = `
You are a knowledgeable assistant that answers user questions by reasoning over the dates in the provided context.

Question: ${query}
    
    Context information:
    ${contextText}

Whenever a question asks for anything like “first,” “earliest,” “oldest,” “most recent,” or other time-based superlatives, you must:

1. Scan the entire context for any date or date range.  
2. Convert those dates into a comparable form (e.g., YYYY-MM-DD).  
3. Determine the correct chronological ordering.  
4. Provide your answer based solely on that temporal analysis, not on the order in which details appear.

Return a concise, accurate answer as if you were the front-end of a chat-based knowledge product.  
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `${prompt}\n\nQ: ${query}` },
    ],
  });

  console.error(
    response.choices[0].message.content,
    "-----------------------------------"
  );

  res.status(200).json({
    results,
    answer: response.choices[0].message.content,
  });
});

router.post("/api/create", upload.single("files"), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const metadataString = req.body.metadata;

    if (!metadataString) {
      return res.status(400).json({ error: "File metadata is required" });
    }

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OpenAI API key" });
    }
    
    const loader = new PDFLoader(path.join(uploadDir, file.filename));
    const docs = await loader.load();

    const project = await prisma.project.create({
      data: {
        name: file.originalname,
        userId: req.user!.id,
      },
    });

    for (const doc of docs) {
      const embedding = await embeddings.embedQuery(doc.pageContent);
      console.log("Embedding:", docs[0].metadata);
      const page = await prisma.page.create({
        data: {
          content: doc.pageContent,
          metadata: JSON.stringify(doc.metadata),
          projectId: project.id,
        },
      });

      await prisma.$executeRaw`
      UPDATE "Page"
        SET "vector" = ${embedding}::vector
        WHERE "id" = ${page.id}
      `;
    }

    interface FileMetadata {
      active: boolean;
      [key: string]: any;
    }

    const filesMetadata: FileMetadata[] = JSON.parse(metadataString);

    res.status(201).json({
      project,
      message: "Project created and files processed successfully.",
      filesProcessed: filesMetadata.filter((m: FileMetadata) => m.active).length,
    });

  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

export default router;
