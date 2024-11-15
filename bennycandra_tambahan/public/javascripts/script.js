// Ambil data wisata dan tampilkan di halaman
async function getWisata() {
    const response = await fetch("/api/wisata");
    const wisata = await response.json();
    displayWisata(wisata);
}

// Fungsi untuk menampilkan data wisata di halaman
function displayWisata(wisata) {
    document.getElementById("wisataList").innerHTML = wisata.map(item => `
        <div class="wisata-item">
            <h2>${item.nama}</h2>
            <p><strong>Lokasi:</strong> ${item.lokasi}</p>
            <p>${item.deskripsi}</p>
            <button onclick="deleteWisata('${item._id}')">Hapus</button>
        </div>
    `).join("");
}

// Tambah data wisata dan tampilkan di halaman
async function addWisata() {
    const nama = document.getElementById("nama").value.trim();
    const lokasi = document.getElementById("lokasi").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();

    if (!nama || !lokasi || !deskripsi) {
        alert("Lengkapi semua kolom!");
        return;
    }

    const response = await fetch("/api/wisata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, lokasi, deskripsi })
    });

    if (response.ok) {
        getWisata();
        document.getElementById("nama").value = '';
        document.getElementById("lokasi").value = '';
        document.getElementById("deskripsi").value = '';
    } else {
        alert("Gagal menambahkan data.");
    }
}

// Hapus data wisata
async function deleteWisata(id) {
    await fetch(`/api/wisata/${id}`, { method: "DELETE" });
    getWisata();
}

// Muat data awal
getWisata();