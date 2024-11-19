import { Sequelize } from "sequelize";
import Gaji from "../models/gaji.model.js";
import Karyawan from "../models/karyawan.model.js";

export const getAllGaji = async (req, res) => {
    try {
        const gaji = await Gaji.findAll({
            include: [
                { model: Karyawan }
            ]
        });
        res.json(gaji);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const tambahGaji = async (req, res) => {
    try {
        const gaji = await Gaji.create({
            id_karyawan: req.body.id_karyawan,
            gaji: req.body.gaji,
            tanggal_gaji: req.body.tanggal_gaji
        });
        res.json({ "message": "Data gaji berhasil ditambahkan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const cariGajiById = async (req, res) => {
    try {
        const gaji = await Gaji.findAll({
            where: {
                id_gaji: req.params.id_gaji,
            },
            include: [
                { model: Karyawan }
            ]
        });
        res.json(gaji);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateGaji = async (req, res) => {
    try {
        const gaji = await Gaji.update({
            id_karyawan: req.body.id_karyawan,
            gaji: req.body.gaji,
            tanggal_gaji: req.body.tanggal_gaji
        },
            {
                where: {
                    id_gaji: req.params.id_gaji,
                }
            });
        res.json({ "message": "Data gaji berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const hapusGaji = async (req, res) => {
    try {
        const gaji = await Gaji.destroy({
            where: {
                id_gaji: req.params.id_gaji,
            }
        });
        res.json({ "message": "Data gaji berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};