import { OpenAIEmbeddings } from "@langchain/openai";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "./config/config";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY,
    model: "text-embedding-ada-002"
});