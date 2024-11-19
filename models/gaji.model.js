import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Karyawan from "./karyawan.model.js";

const { DataTypes } = Sequelize;
const Gaji = db.define(
    "gajis",
    {
        id_gaji: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_karyawan: {
            type: DataTypes.INTEGER,
        },
        gaji: {
            type: DataTypes.INTEGER,
        },
        tanggal_gaji: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
    }
);

Karyawan.hasOne(Gaji, { foreignKey: "id_karyawan" });
Gaji.belongsTo(Karyawan, { foreignKey: "id_karyawan" });

export default Gaji;