import { Sequelize } from "sequelize";
const db = new Sequelize('pegawai_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    "define": {
        "timestamps": false
    }
});
export default db;

(async () => {
    await db.sync();
})();