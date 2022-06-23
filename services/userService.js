
// import { UserSql } from '../models/user';
import md5 from "md5";
// const userSql = new UserSql();

import * as pg from "pg";

const options = {
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "123456"
    
}

const sqlPool = new pg.Pool(options);
const sql = `CREATE TABLE users (
    id INT4 NOT NULL,
    LOGIN TEXT NOT NULL, -- 用户名
    PASSWORD VARCHAR(255) NOT NULL, -- 用户密码
    AGE INT NOT NULL, -- 用户年龄
    IS_DELETED INT DEFAULT 0 NOT NULL, -- 是否被删除1 已删除,
    PRIMARY KEY(id)
);`
const sql2 = `select count(*) from pg_class where relname = 'users';`
sqlPool.connect(async(err) => {
    if(err) {
        return console.error('数据库连接失败', err);
    // console.log('数据库连接成功并创建users表', created)
    }
    sqlPool.query(sql2).then((res) => {
        const [{count}] = res.rows;
        if(count === '0') {
            sqlPool.query(sql);
            
            return console.log("users表创建成功")
        }
        return console.log("users表已存在", count)
    });
    // sqlPool.query(sql);
})


export const reGetUser = async (id) => {
    const res  = await UserSql.findByPk(id);
    // return {
    //     code: 0,
    //     message: "success",
    //     data: res
    // }
}

export const createUser = async ({login: logins, password: passwords, age}) => {
    console.log("====参数", logins, passwords)
    passwords = md5(passwords);
    // 如何在postgressql中设置id自增
    const currentSql = `
    INSERT INTO users (login, PASSWORD) VALUES ('"+ logins +"', '"+ passwords +"');
    `
    // 是否已存在该条数据
    const result = await sqlPool.query(currentSql);
      
    return {
        code: 0,
        message: "create success",
        data: result
    }

}

export const updateUser = async (id) => {
    // await userModel.updateUser(id);
    // return {
    //     code: 0,
    //     message: "update success"
    // }
}

export const deleteUser = async (id) => {
    // await userModel.deleteUser(id);
    // return {
    //     code: 0,
    //     message: "create success"
    // }
}

