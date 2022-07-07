
import { UserSql } from '../models/user';
import { sqlPool } from "../config/db";
import md5 from "md5";
import HttpException from '../exception';


class UserService {
    async reGetUser (id) {
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
      
     async createUser ({login: logins, password: passwords, age}) {
          try {
            passwords = md5(passwords);
            // 是否已存在该条数据
            
          } catch (error) {
            
          }
          
      }
      
      async updateUser ({id, newLogin}) {
          try {
              await isUser(id);
             
          } catch (error) {
          
          }
      }
      
    async deleteUser (id) {
          try {
              // 用户存在？
              await isUser(id);
          } catch (error) {
           
          }
          
      }
}
 export { UserService }
