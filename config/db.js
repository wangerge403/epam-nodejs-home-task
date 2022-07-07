// import { Sequelize } from "sequelize";

// const database = "postgres", username = "postgres", password = "123456";
// const options = {
//     host: "localhost",
//     port: "5432",
//     dialect: 'postgres',
    
// }

// const sequelize = new Sequelize(database, username, password, options);

// export default sequelize;


import * as pg from "pg";

const options = {
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "123456"
    
}

export const sqlPool = new pg.Pool(options);



