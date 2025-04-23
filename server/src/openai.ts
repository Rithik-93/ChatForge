import { OpenAIEmbeddings } from "@langchain/openai";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-ada-002"
});