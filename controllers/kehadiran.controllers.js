import { Sequelize } from "sequelize";
import Karyawan from "../models/karyawan.model.js";
import Kehadiran from "../models/kehadiran.model.js";

export const getAllKehadiran = async (req, res) => {
    try {
        const kehadiran = await Kehadiran.findAll({
            include: { model: Karyawan }
        });
        res.json(kehadiran);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const tambahKehadiranByKaryawan = async (req, res) => {
    try {
        const { id_karyawan, tanggal_kehadiran, status } = req.body;

        if (!id_karyawan) {
            return res.status(400).json({ message: "ID karyawan tidak valid atau tidak ditemukan" });
        }

        // Memeriksa apakah karyawan dengan id_karyawan ini terdaftar
        const karyawan = await Karyawan.findOne({ where: { id_karyawan: id_karyawan } });
        if (!karyawan) {
            return res.status(404).json({ message: "Karyawan belum terdaftar, tidak bisa absen" });
        }

        // Memeriksa apakah kehadiran sudah ada untuk karyawan dan tanggal ini
        const existingKehadiran = await Kehadiran.findOne({
            where: {
                id_karyawan: id_karyawan,
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("DATE", Sequelize.col("tanggal_kehadiran")),
                        tanggal_kehadiran
                    )
                ]
            },
            include: [{ model: Karyawan }]
        });

        if (existingKehadiran) {
            return res.status(400).json({ message: "Kehadiran sudah diisi untuk hari ini" });
        }

        const newKehadiran = await Kehadiran.create({
            id_karyawan,
            tanggal_kehadiran,
            status
        });
        res.status(201).json(newKehadiran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const cariKehadiranByKaryawan = async (req, res) => {
    try {
        const { id_karyawan, bulanAwal, bulanAkhir, tahun } = req.params;

        //validasi input bulan dan tahun
        if (!bulanAwal || !bulanAkhir || !tahun) {
            return res.status(400).json({ message: "Bulan dan tahun harus diisi" });
        }

        const bulanAwalFormatted = bulanAwal.padStart(2, '0');
        const bulanAkhirFormatted = bulanAkhir.padStart(2, '0');

        const kehadiran = await Kehadiran.findAll({
            where: {
                id_karyawan: id_karyawan,
                tanggal_kehadiran: {
                    [Sequelize.Op.between]: [
                        `${tahun}-${bulanAwalFormatted}-01`,
                        `${tahun}-${bulanAkhirFormatted}-31`,
                    ],
                },
            },
            include: { model: Karyawan },
        });
        res.json(kehadiran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const cariKehadiranByKaryawanStatus = async (req, res) => {
    try {
        const { id_karyawan, bulanAwal, bulanAkhir, tahun, status } = req.params;

        // Validasi input bulan, tahun, dan status
        if (!bulanAwal || !bulanAkhir || !tahun || !status) {
            return res.status(400).json({ message: "Bulan, tahun, dan status harus diisi" });
        }

        const bulanAwalFormatted = bulanAwal.padStart(2, '0');
        const bulanAkhirFormatted = bulanAkhir.padStart(2, '0');

        const kehadiran = await Kehadiran.findAll({
            where: {
                id_karyawan: id_karyawan,
                status: status,
                tanggal_kehadiran: {
                    [Sequelize.Op.between]: [
                        `${tahun}-${bulanAwalFormatted}-01`,
                        `${tahun}-${bulanAkhirFormatted}-31`,
                    ],
                },
            },
            include: { model: Karyawan },
        });
        res.json(kehadiran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllKehadiranByStatus = async (req, res) => {
    try {
        const kehadiran = await Kehadiran.findAll({
            where: {
                status: req.params.status,
            },
            include: { model: Karyawan }
        });
        res.json(kehadiran);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllKehadiranByBulan = async (req, res) => {
    try {
        const kehadiran = await Kehadiran.findAll({
            where: Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("tanggal_kehadiran")), req.params.bulan),
            include: { model: Karyawan }
        });
        res.json(kehadiran);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const lihatKehadiranSendiri = async (req, res) => {
    const { bulan, tahun } = req.params;

    try {
        const kehadiran = await Kehadiran.findAll({
            include: [
                {
                    model: Karyawan,
                    where: { id_users: req.user.id_users },
                }
            ],
            where: Sequelize.where(
                Sequelize.fn('DATE_FORMAT', Sequelize.col('tanggal_kehadiran'), '%Y-%m'),
                `${tahun}-${bulan.padStart(2, '0')}`
            ),
            order: [["tanggal_kehadiran", "DESC"]],
        });
        res.json(kehadiran);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const lihatKehadiranRentang = async (req, res) => {
    const { bulanAwal, bulanAkhir, tahun } = req.params;

    try {
        // Format bulan menjadi dua digit (01, 02, dst.)
        const bulanAwalFormatted = bulanAwal.padStart(2, '0');
        const bulanAkhirFormatted = bulanAkhir.padStart(2, '0');

        const kehadiran = await Kehadiran.findAll({
            include: [
                {
                    model: Karyawan,
                    where: { id_users: req.user.id_users },
                }
            ],
            where: {
                tanggal_kehadiran: {
                    [Sequelize.Op.between]: [
                        `${tahun}-${bulanAwalFormatted}-01`,
                        `${tahun}-${bulanAkhirFormatted}-31`,
                    ],
                },
            },
            order: [["tanggal_kehadiran", "DESC"]],
        });
        res.json(kehadiran);
    } catch (error) {
        res.json({ message: error.message });
    }
};



