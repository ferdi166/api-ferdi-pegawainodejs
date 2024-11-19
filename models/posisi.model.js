import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;
const Posisi = db.define(
    "posisis",
    {
        id_posisi: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_posisi: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

export default Posisi;