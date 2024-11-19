import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import User from "./user.model.js";
import Posisi from "./posisi.model.js";

const { DataTypes } = Sequelize;
const Karyawan = db.define(
    "karyawans",
    {
        id_karyawan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_users: {
            type: DataTypes.INTEGER,
        },
        nama_karyawan: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        nomor_telepon: {
            type: DataTypes.STRING,
        },
        alamat: {
            type: DataTypes.STRING,
        },
        id_posisi: {
            type: DataTypes.INTEGER,
        },
        tanggal_bergabung: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
    }
);

User.hasOne(Karyawan, { foreignKey: "id_users" });
Karyawan.belongsTo(User, { foreignKey: "id_users" });

Posisi.hasMany(Karyawan, { foreignKey: "id_posisi" });
Karyawan.belongsTo(Posisi, { foreignKey: "id_posisi" });

export default Karyawan;