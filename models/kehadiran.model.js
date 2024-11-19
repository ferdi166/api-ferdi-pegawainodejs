import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Karyawan from "./karyawan.model.js";

const { DataTypes } = Sequelize;
const Kehadiran = db.define(
    "kehadirans",
    {
        id_kehadiran: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_karyawan: {
            type: DataTypes.INTEGER,
        },
        tanggal_kehadiran: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM("hadir", "izin", "sakit", "alpa"),
        },
    },
    {
        freezeTableName: true,
    }
);

Karyawan.hasOne(Kehadiran, { foreignKey: "id_karyawan" });
Kehadiran.belongsTo(Karyawan, { foreignKey: "id_karyawan" });

export default Kehadiran;