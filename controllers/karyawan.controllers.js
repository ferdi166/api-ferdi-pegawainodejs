import { Sequelize, where } from "sequelize";
import Karyawan from "../models/karyawan.model.js";
import User from "../models/user.model.js";
import Posisi from "../models/posisi.model.js";

export const getAllKaryawan = async (req, res) => {
    try {
        const karyawan = await Karyawan.findAll({
            include: [
                { model: User },
                { model: Posisi }
            ]
        });
        res.json(karyawan);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const tambahKaryawan = async (req, res) => {
    try {
        // Validasi: cek apakah sudah ada karyawan dengan nama_karyawan dan id_users yang sama
        const existingKaryawanByIdUser = await Karyawan.findOne({
            where: {
                id_users: req.body.id_users,
            },
        });

        if (existingKaryawanByIdUser) {
            return res.status(400).json({
                message: "ID user sudah dimiliki oleh karyawan lain.",
            });
        }

        const existingKaryawanByName = await Karyawan.findOne({
            where: {
                nama_karyawan: req.body.nama_karyawan,
            },
        });

        if (existingKaryawanByName) {
            return res.status(400).json({
                message: "Nama karyawan sudah dimiliki oleh karyawan lain.",
            });
        }

        const karyawan = await Karyawan.create(
            {
                id_users: req.body.id_users,
                nama_karyawan: req.body.nama_karyawan,
                email: req.body.email,
                nomor_telepon: req.body.nomor_telepon,
                alamat: req.body.alamat,
                id_posisi: req.body.id_posisi,
                tanggal_bergabung: req.body.tanggal_bergabung
            },
            {
                include: [
                    { model: User },
                    { model: Posisi }
                ]
            }
        );
        res.json(karyawan);
    }
    catch (error) {
        res.json({ "message": error.message });
    }
};

export const cariKaryawanById = async (req, res) => {
    try {
        const karyawan = await Karyawan.findAll({
            where: {
                id_karyawan: req.params.id_karyawan,
            },
            include: [
                { model: User },
                { model: Posisi }
            ]
        });
        res.json(karyawan);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const cariKaryawanByPosisi = async (req, res) => {
    try {
        const karyawan = await Karyawan.findAll({
            where: {
                id_posisi: req.params.id_posisi,
            },
            include: [
                { model: User },
                { model: Posisi }
            ]
        });
        res.json(karyawan);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateKaryawan = async (req, res) => {
    try {
        const karyawan = await Karyawan.update(
            {
                id_users: req.body.id_users,
                nama_karyawan: req.body.nama_karyawan,
                email: req.body.email,
                nomor_telepon: req.body.nomor_telepon,
                alamat: req.body.alamat,
                id_posisi: req.body.id_posisi,
                tanggal_bergabung: req.body.tanggal_bergabung
            },
            {
                where: {
                    id_karyawan: req.params.id_karyawan,
                }
            }
        );
        res.json({ "message": "Data karyawan berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const hapusKaryawan = async (req, res) => {
    try {
        const karyawan = await Karyawan.destroy({
            where: {
                id_karyawan: req.params.id_karyawan,
            }
        });
        res.json({ "message": "Data karyawan berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
