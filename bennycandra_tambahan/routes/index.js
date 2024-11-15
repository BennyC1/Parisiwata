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

// GET: Halaman utama (Render EJS)
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
