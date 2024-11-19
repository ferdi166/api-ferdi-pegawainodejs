import { Sequelize } from "sequelize";
import Posisi from "../models/posisi.model.js";

export const getAllPosisi = async (req, res) => {
    try {
        const posisi = await Posisi.findAll();
        res.json(posisi);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const tambahPosisi = async (req, res) => {
    try {
        const posisi = await Posisi.create(req.body);
        res.json({ "message": "Data posisi berhasil ditambahkan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const cariPosisiById = async (req, res) => {
    try {
        const posisi = await Posisi.findAll({
            where: {
                id_posisi: req.params.id_posisi,
            }
        });
        res.json(posisi);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updatePosisi = async (req, res) => {
    try {
        const posisi = await Posisi.update(req.body, {
            where: {
                id_posisi: req.params.id_posisi,
            }
        });
        res.json({ "message": "Data posisi berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const hapusPosisi = async (req, res) => {
    try {
        const posisi = await Posisi.destroy({
            where: {
                id_posisi: req.params.id_posisi,
            }
        });
        res.json({ "message": "Data posisi berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};