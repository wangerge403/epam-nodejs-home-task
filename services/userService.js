
// import { UserSql } from '../models/user';
import { sqlPool } from "../config/db";
import md5 from "md5";
import HttpException from '../exception';
// const userSql = new UserSql();
// 创建用户
const sql3 = ({logins, passwords, age}) => {return `INSERT INTO users (login, PASSWORD) VALUES ('"+ logins +"', '"+ passwords +"');`} 
// 此用户详情
const sql4 = (id) => {return `SELECT count(*) from users where id = '"+ id +"' AND is_deleted = 0;`}
const isUser = async(id) => {
  const res = await sqlPool.query(sql4(id));
  const [{count}] = res.rows;
    if(count === '0') {
      throw new HttpException({ code: 100003, message: ERROR_CODES[100003] });
    }
    return true;
}
// 更新用户
const sql5 = ({id, newLogin}) => {return `SELECT users SET login = '"+ newLogin +"' where id = '"+ id +"' AND is_deleted = 0;`} 
// 删除用户
const sql6 = (id) => {return `SELECT users SET is_deleted = 1 where id = '"+ id +"';`} 
// 是否存在此数据
const sql7 = ({login: logins}) => {return `SELECT count(*) FROM users WHERE is_deleted = 0 AND login = '"+ logins +"';`} 


export const reGetUser = async (id) => {
  try {
    const res = await sqlPool.query(sql4(id));
    console.log(res)
    return {
      code: 0,
      message: "query success",
      data: res
    }
  } catch (error) {
    throw new HttpException({ code: 500001, message: error });
  }
}

export const createUser = async ({login: logins, password: passwords, age}) => {
    try {
      passwords = md5(passwords);
      // 如何在postgressql中设置id自增？？
      // 是否已存在该条数据
      sqlPool.query(sql7({login: logins})).then((res) => {
        const [{count}] = res.rows;
        if(count === '1') {
          throw new HttpException({ code: 100003, message: ERROR_CODES[100003] });
        }
      })
      await sqlPool.query(sql3({logins, passwords, age}));
      
      return {
        code: 0,
        message: "create success",
        data: {}
      }
    } catch (error) {
      return {
        code: 500,
        message: "error"
      }
    }
    
}

export const updateUser = async ({id, newLogin}) => {
    try {
        await isUser(id);
        await sqlPool.query(sql5({id, newLogin}));
        return {
            code: 0,
            message: "update success",
            data: {}
        }
    } catch (error) {
      return {
        code: 500,
        message: "error"
      }
    }
}

export const deleteUser = async (id) => {
    try {
        // 用户存在？
        await isUser(id);
        await sqlPool.query(sql6(id));
        return {
            code: 0,
            message: "delete success",
            data: {}
        }
    } catch (error) {
      return {
        code: 500,
        message: "error"
      }
    }
    
}

