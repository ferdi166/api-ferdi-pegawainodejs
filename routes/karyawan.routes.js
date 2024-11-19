import express from 'express';

import {
    getAllKaryawan,
    tambahKaryawan,
    cariKaryawanById,
    cariKaryawanByPosisi,
    updateKaryawan,
    hapusKaryawan
} from "../controllers/karyawan.controllers.js";
import { authenticateToken } from '../middleware/VerifyTokens.js';
import { authorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();
router.get("/", authenticateToken, authorizeAdmin, getAllKaryawan);
router.post("/", authenticateToken, authorizeAdmin, tambahKaryawan);
router.get("/:id_karyawan", authenticateToken, authorizeAdmin, cariKaryawanById);
router.get("/posisi/:id_posisi", authenticateToken, authorizeAdmin, cariKaryawanByPosisi);
router.patch("/:id_karyawan", authenticateToken, authorizeAdmin, updateKaryawan);
router.delete("/:id_karyawan", authenticateToken, authorizeAdmin, hapusKaryawan);

export default router;