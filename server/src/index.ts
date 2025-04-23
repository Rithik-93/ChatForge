import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
import prisma from "./prisma/src";
import { embeddings, openai } from "./openai";
import { login, register } from "./controllers/auth.controller";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/api/signup", register);
app.post("/api/login", login);

app.post("/api/upload-sources", upload.single("file"), async (req, res) => {
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

    const project = await prisma.project.upsert({
      where: { id: "1" },
      create: {
        id: "1",
        name,
        userId: "1",
      },
      update: {
        name,
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

    console.log("File received and processed:", file.filename);
    res
      .status(200)
      .json({
        message: "File uploaded and vectorized successfully",
        filename: file.filename,
      });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/query-sources", async (req, res) => {
  const query = req.body.query;
  const projectId = req.body.projectId || "1";

  const userId = "1";
  const project = await prisma.project.findUnique({
    where: { id: projectId, userId },
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
;
    

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `${prompt}\n\nQ: ${query}` }
    ]
  });
    
  console.error(response.choices[0].message.content,"-----------------------------------");
  
  // console.log("Query results:", results);
  
  res.status(200).json({ 
    results, 
    answer: response.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
