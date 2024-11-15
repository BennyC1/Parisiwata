const express = require('express');
const router = express.Router();
const Wisata = require('../models/Wisata'); // Import model Wisata

// GET: Ambil semua data wisata
router.get('/api/wisata', async (req, res) => {
    try {
        const wisataList = await Wisata.find();
        res.json(wisataList);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
});

// POST: Tambah data wisata baru
router.post('/api/wisata', async (req, res) => {
    const { nama, lokasi, deskripsi } = req.body;

    // Validasi sederhana
    if (!nama || !lokasi || !deskripsi) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
    }

    try {
        const wisata = new Wisata({ nama, lokasi, deskripsi });
        const newWisata = await wisata.save();
        res.status(201).json(newWisata);
    } catch (err) {
        res.status(500).json({ message: "Gagal menyimpan data" });
    }
});

// DELETE: Hapus data wisata berdasarkan ID
router.delete('/api/wisata/:id', async (req, res) => {
    try {
        const wisata = await Wisata.findByIdAndDelete(req.params.id);
        if (!wisata) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json({ message: "Data berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus data" });
    }
});

// Route untuk memperbarui data wisata
router.put('/api/wisata/:id', async (req, res) => {
  const { nama, lokasi, deskripsi } = req.body;

  // Validasi data input
  if (!nama || !lokasi || !deskripsi) {
      return res.status(400).json({ message: "Semua kolom harus diisi" });
  }

  try {
      // Mengupdate data wisata berdasarkan ID
      const wisata = await Wisata.findByIdAndUpdate(
          req.params.id,
          { nama, lokasi, deskripsi },
          { new: true } // Mengembalikan data wisata yang sudah diperbarui
      );

      if (!wisata) {
          return res.status(404).json({ message: "Data wisata tidak ditemukan" });
      }

      res.render('edit-wisata', { wisata });
  } catch (err) {
      res.status(500).json({ message: "Gagal memperbarui data wisata" });
  }
});

// GET: Halaman utama (Render EJS)
router.get('/', (req, res) => {
    res.render('index');
});

// Route halaman daftar wisata
router.get('/daftar-wisata', async (req, res) => {
  try {
      const wisataList = await Wisata.find(); // Ambil semua data wisata
      res.render('daftar-wisata', { wisataList });
  } catch (err) {
      res.status(500).send("Gagal memuat halaman daftar wisata");
  }
});

// Route untuk menampilkan halaman edit wisata
router.get('/edit-wisata/:id', async (req, res) => {
  try {
      const wisata = await Wisata.findById(req.params.id);
      if (!wisata) {
          return res.status(404).send('Wisata tidak ditemukan');
      }
      res.render('edit-wisata', { wisata }); // Mengirim data wisata ke halaman edit-wisata.ejs
  } catch (err) {
      res.status(500).send('Gagal mengambil data wisata');
  }
});

module.exports = router;
