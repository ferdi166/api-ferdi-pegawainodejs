import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, "your_jwt_secret_key");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
};
