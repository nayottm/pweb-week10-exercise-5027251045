CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "mahasiswa" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("id")
);
