import express from 'express';

import {
    getAllGaji,
    tambahGaji,
    cariGajiById,
    updateGaji,
    hapusGaji
} from "../controllers/gaji.controllers.js";
import { authenticateToken } from '../middleware/VerifyTokens.js';
import { authorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();
router.get("/", authenticateToken, authorizeAdmin, getAllGaji);
router.post("/", authenticateToken, authorizeAdmin, tambahGaji);
router.get("/:id_gaji", authenticateToken, authorizeAdmin, cariGajiById);
router.patch("/:id_gaji", authenticateToken, authorizeAdmin, updateGaji);
router.delete("/:id_gaji", authenticateToken, authorizeAdmin, hapusGaji);

export default router;
