import express from 'express';

import {
    getAllPosisi,
    tambahPosisi,
    cariPosisiById,
    updatePosisi,
    hapusPosisi
} from "../controllers/posisi.controllers.js";
import { authenticateToken } from '../middleware/VerifyTokens.js';
import { authorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();
router.get("/", authenticateToken, authorizeAdmin, getAllPosisi);
router.post("/", authenticateToken, authorizeAdmin, tambahPosisi);
router.get("/:id_posisi", authenticateToken, authorizeAdmin, cariPosisiById);
router.patch("/:id_posisi", authenticateToken, authorizeAdmin, updatePosisi);
router.delete("/:id_posisi", authenticateToken, authorizeAdmin, hapusPosisi);

export default router;