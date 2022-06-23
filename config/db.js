import { Sequelize } from "sequelize";

const database = "postgres", username = "postgres", password = "123456";
const options = {
    host: "localhost",
    port: "5432",
    dialect: 'postgres',
    
}

const sequelize = new Sequelize(database, username, password, options);

export default sequelize;

