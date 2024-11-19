import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const tambahUser = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, role } = req.body;
        // Cek apakah username sudah ada untuk role yang sama
        const existingUser = await User.findOne({
            where: {
                username: username,
                role: role
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: `Username sudah digunakan untuk role ${role}, silakan pilih username lain.` });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            password: hashedPassword,
            role: role
        });
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await User.findAll({
            where: {
                username: username,
            }
        });
        if (login.length === 0) return res.status(404).send("User not found");
        const user = login[0];
        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");
        // Generate token
        const token = jwt.sign({ id_users: user.id_user, role: user.role }, "your_jwt_secret_key", { expiresIn: "1h" });
        res.json({ token: token });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const id_user = req.params.id_user;
        const user = await User.update({
            username: username,
            password: password,
            role: role
        }, {
            where: {
                id_user: id_user
            }
        });
        res.json({ "message": "User berhasil diupdate!" });
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}
