import express from 'express';

import {
    getAllUser,
    tambahUser,
    updateUser,
    login
} from "../controllers/user.controllers.js";
import { authenticateToken } from '../middleware/VerifyTokens.js';
import { authorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();
router.get("/", authenticateToken, authorizeAdmin, getAllUser);
router.post("/", authenticateToken, authorizeAdmin, tambahUser);
router.post("/login", login);
router.patch("/update/:id_user", authenticateToken, authorizeAdmin, updateUser);
router.get("/dashboard", authenticateToken, (req, res) => {
    if (req.user.role === "Admin") {
        res.send("Welcome to the admin dashboard!");
    } else if (req.user.role === "Karyawan") {
        res.send("Welcome to the karyawan dashboard!");
    } else {
        res.status(403).send("Access forbidden: Unauthorized role");
    }
});


export default router;