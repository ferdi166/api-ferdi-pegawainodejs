import express from "express";
import db from "./config/db.config.js";
import Gaji from "./routes/gaji.routes.js";
import Karyawan from "./routes/karyawan.routes.js";
import Kehadiran from "./routes/kehadiran.routes.js";
import Posisi from "./routes/posisi.routes.js";
import User from "./routes/user.routes.js";
import cors from "cors";

const app = express();
try {
    await db.authenticate();
    console.log("database connected");
} catch (error) {
    console.error("database connection failed");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/gaji", Gaji);
app.use("/api/karyawan", Karyawan);
app.use("/api/kehadiran", Kehadiran);
app.use("/api/posisi", Posisi);
app.use("/api/user", User);

app.listen(5000);