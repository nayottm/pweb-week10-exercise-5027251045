ALTER TABLE "mahasiswa" RENAME TO "alat_sinematografi";

UPDATE "alat_sinematografi"
SET "nama" = CASE "nama"
    WHEN 'Budi' THEN 'Kamera Cinema'
    WHEN 'Siti' THEN 'Lensa 35mm'
END
WHERE "nama" IN ('Budi', 'Siti');
