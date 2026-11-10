const form = document.querySelector("#form-alat");
const inputNamaAlat = document.querySelector("#nama-alat");
const daftar = document.querySelector("#daftar-alat");
const pesan = document.querySelector("#pesan");
const tombol = form.querySelector("button[type='submit']");
const tombolBatal = document.querySelector("#tombol-batal");

let idEdit = null;

async function requestApi(url, options) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      "API tidak mengembalikan JSON. Buka halaman melalui http://localhost:3000 (bukan Live Server atau file HTML), lalu pastikan server berjalan dengan npm run dev."
    );
  }

  return { response, hasil: await response.json() };
}

function keluarModeEdit() {
  idEdit = null;
  form.reset();
  tombol.textContent = "Tambah alat";
  tombolBatal.hidden = true;
}

function mulaiEdit(alat) {
  idEdit = alat.id;
  inputNamaAlat.value = alat.nama;
  tombol.textContent = "Simpan perubahan";
  tombolBatal.hidden = false;
  inputNamaAlat.focus();
}

tombolBatal.addEventListener("click", () => {
  keluarModeEdit();
  pesan.textContent = "";
});

async function muatAlat() {
  const { response, hasil } = await requestApi("/alat-sinematografi");
  if (!response.ok) throw new Error("Data gagal dimuat");
  daftar.replaceChildren();
  hasil.data.forEach((alat) => {
    const baris = daftar.insertRow();
    baris.insertCell().textContent = alat.id;
    baris.insertCell().textContent = alat.nama;

    const selAksi = baris.insertCell();
    const grupAksi = document.createElement("div");
    grupAksi.className = "aksi-tabel";

    const tombolEdit = document.createElement("button");
    tombolEdit.type = "button";
    tombolEdit.textContent = "Edit";
    tombolEdit.addEventListener("click", () => mulaiEdit(alat));

    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "hapus";
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", () => hapusAlat(alat.id));

    grupAksi.append(tombolEdit, tombolHapus);
    selAksi.appendChild(grupAksi);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  tombol.disabled = true;
  try {
    const sedangEdit = idEdit !== null;
    const url = sedangEdit ? `/alat-sinematografi/${idEdit}` : "/alat-sinematografi";
    const method = sedangEdit ? "PUT" : "POST";

    const { response, hasil } = await requestApi(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: inputNamaAlat.value }),
    });
    pesan.textContent = hasil.message;
    if (response.ok) {
      keluarModeEdit();
      await muatAlat();
    }
  } catch (error) {
    pesan.textContent = error.message;
  } finally {
    tombol.disabled = false;
  }
});

async function hapusAlat(id) {
  try {
    const { response, hasil } = await requestApi(`/alat-sinematografi/${id}`, {
      method: "DELETE",
    });
    pesan.textContent = hasil.message;
    if (response.ok) {
      if (idEdit === id) keluarModeEdit();
      await muatAlat();
    }
  } catch (error) {
    pesan.textContent = error.message;
  }
}

muatAlat().catch((error) => { pesan.textContent = error.message; });
