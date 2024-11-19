import express from 'express';

import {
    getAllKehadiran,
    tambahKehadiranByKaryawan,
    cariKehadiranByKaryawan,
    cariKehadiranByKaryawanStatus,
    getAllKehadiranByBulan,
    getAllKehadiranByStatus,
    lihatKehadiranSendiri,
    lihatKehadiranRentang
} from "../controllers/kehadiran.controllers.js";
import { authenticateToken } from '../middleware/VerifyTokens.js';
import { authorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();
router.get("/", authenticateToken, authorizeAdmin, getAllKehadiran);
router.post("/", authenticateToken, tambahKehadiranByKaryawan);
router.get("/karyawan/:id_karyawan/:bulanAwal/:bulanAkhir/:tahun", authenticateToken, authorizeAdmin, cariKehadiranByKaryawan);
router.get("/karyawan/:id_karyawan/:bulanAwal/:bulanAkhir/:tahun/:status", authenticateToken, authorizeAdmin, cariKehadiranByKaryawanStatus);
router.get("/bulan/:bulan", authenticateToken, authorizeAdmin, getAllKehadiranByBulan);
router.get("/status/:status", authenticateToken, authorizeAdmin, getAllKehadiranByStatus);
router.get("/sendiri/:bulan/:tahun", authenticateToken, lihatKehadiranSendiri);
router.get('/sendiri/rentang/:bulanAwal/:bulanAkhir/:tahun', authenticateToken, lihatKehadiranRentang);

export default router;