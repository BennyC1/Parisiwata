const mongoose = require('mongoose');

const wisataSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    lokasi: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Wisata', wisataSchema);
