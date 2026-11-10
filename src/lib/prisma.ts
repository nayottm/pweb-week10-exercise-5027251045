import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL belum diatur. Salin .env.example ke .env dan isi URL Neon.");
}

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter });
