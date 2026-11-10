import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function getAlatSinematografi(_req: Request, res: Response): Promise<void> {
  const data = await prisma.alatSinematografi.findMany({ orderBy: { id: "asc" } });

  res.status(200).json({
    message: "Daftar alat sinematografi berhasil dimuat",
    data,
  });
}

export async function postAlatSinematografi(req: Request, res: Response): Promise<void> {
  const { nama } = req.body ?? {};

  if (typeof nama !== "string" || nama.trim() === "") {
    res.status(400).json({ message: "nama alat wajib berupa teks dan tidak boleh kosong" });
    return;
  }

  const dataBaru = await prisma.alatSinematografi.create({
    data: { nama: nama.trim() },
  });

  res.status(201).json({
    message: "Alat berhasil ditambahkan",
    data: dataBaru,
  });
}

export async function putAlatSinematografi(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ message: "ID alat harus berupa bilangan bulat positif" });
    return;
  }

  const data = await prisma.alatSinematografi.findUnique({ where: { id } });

  if (!data) {
    res.status(404).json({ message: "Alat tidak ditemukan" });
    return;
  }

  const { nama } = req.body ?? {};

  if (typeof nama !== "string" || nama.trim() === "") {
    res.status(400).json({ message: "nama alat wajib berupa teks dan tidak boleh kosong" });
    return;
  }

  const dataDiperbarui = await prisma.alatSinematografi.update({
    where: { id },
    data: { nama: nama.trim() },
  });

  res.status(200).json({
    message: "Nama alat berhasil diperbarui",
    data: dataDiperbarui,
  });
}

export async function deleteAlatSinematografi(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ message: "ID alat harus berupa bilangan bulat positif" });
    return;
  }

  const hasil = await prisma.alatSinematografi.deleteMany({ where: { id } });

  if (hasil.count === 0) {
    res.status(404).json({ message: "Alat tidak ditemukan" });
    return;
  }

  res.status(200).json({
    message: "Alat berhasil dihapus",
  });
}
