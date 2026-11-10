# Inventaris Alat Sinematografi

Aplikasi inventaris alat sinematografi dengan Express, Prisma, dan Neon. Data alat dapat dilihat dan dikelola melalui halaman web atau API CRUD.

## Menjalankan

Gunakan Node.js 24 atau lebih baru. Buka folder proyek di VS Code. Pada terminal di folder yang memiliki `package.json`:

```powershell
Copy-Item .env.example .env
npm ci
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Sebelum migrasi, isi `DATABASE_URL` dan `DIRECT_URL` Neon di file `.env`. Gunakan connection string pooled untuk `DATABASE_URL` dan connection string direct untuk `DIRECT_URL`. Jangan commit file `.env`.

Website: **http://localhost:3000**

API: **http://localhost:3000/alat-sinematografi**

Migrasi membuat tabel `alat_sinematografi`. Untuk database yang sebelumnya memakai tabel `mahasiswa`, migrasi lanjutan mengganti nama tabel tanpa menghapus datanya dan mengganti data contoh Budi/Siti menjadi Kamera Cinema/Lensa 35mm. Seed menambahkan dua alat contoh hanya jika tabel masih kosong. Untuk melewati data contoh pada database kosong, lewati `npm run db:seed`.

Hentikan server sebelumnya jika port 3000 sedang digunakan. Buka halaman melalui Express, bukan klik langsung HTML atau melalui Live Server. Selalu jalankan server dari folder proyek karena `express.static("public")` memakai path relatif.

Untuk memeriksa TypeScript serta menjalankan hasil kompilasi:

```bash
npm run build
npm start
```

Jalankan dev atau start bergantian. `npm run dev` memakai watch sehingga perubahan kode server memicu restart.

## API CRUD

Semua endpoint diawali dengan `/alat-sinematografi`. Kolom data yang dikirim adalah `nama`.

| Method | URL | Body JSON | Status sukses |
| --- | --- | --- | --- |
| GET | `http://localhost:3000/alat-sinematografi` | Tidak ada | 200 |
| POST | `http://localhost:3000/alat-sinematografi` | `{"nama":"Kamera Cinema"}` | 201 |
| PUT | `http://localhost:3000/alat-sinematografi/1` | `{"nama":"Kamera Cinema 4K"}` | 200 |
| DELETE | `http://localhost:3000/alat-sinematografi/1` | Tidak ada | 200 |

Gunakan ID yang dikembalikan oleh GET atau POST untuk PUT dan DELETE. Ulangi GET setelah setiap perubahan.

Untuk POST dan PUT, pilih Body → raw → JSON agar header `Content-Type: application/json` tersedia. Untuk DELETE pilih Body: none. Nama kosong atau bukan teks menghasilkan 400; ID tidak ditemukan menghasilkan 404.

Halaman web menyediakan GET, POST, PUT, dan DELETE melalui tombol tambah, edit, dan hapus.

Data disimpan di Neon melalui Prisma, sehingga tetap ada setelah server dimulai ulang.
