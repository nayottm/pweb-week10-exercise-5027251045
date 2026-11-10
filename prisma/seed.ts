import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL belum diatur");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

try {
  if ((await prisma.alatSinematografi.count()) === 0) {
    await prisma.alatSinematografi.createMany({
      data: [{ nama: "Kamera Cinema" }, { nama: "Lensa 35mm" }],
    });
  }
} catch (error) {
  console.error("Gagal mengisi data awal alat sinematografi:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
