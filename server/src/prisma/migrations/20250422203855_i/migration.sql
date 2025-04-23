/*
  Warnings:

  - You are about to drop the `pdf_docs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pdf_docs";

-- CreateTable
CREATE TABLE "PdfDoc" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "vector" vector(1536) NOT NULL,

    CONSTRAINT "PdfDoc_pkey" PRIMARY KEY ("id")
);
