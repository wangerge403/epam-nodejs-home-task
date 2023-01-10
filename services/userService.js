
import { UserModel } from '../models/user';
import { UserGroupModel } from '../models/userGroup';
import md5 from "md5";
import HttpException from '../exception';


class UserService {
  async reGetUser (id) {
      try {
        const result = await this.getUserById(id);
        if (result) {
          return result.toJSON();
        }
        return null;
      } catch (error) {
        throw new HttpException({ code: 500001, message: error });
      }
  }
    
  async createUser ({login, password, age, groupId}) {
      try {
        passwords = md5(password);
        // 是否已存在该条数据
        let user = await UserModel.findOne({
          where: {
            login
          }
        })
        if(user){
          throw new HttpException({ code: 100002});
        }
        await UserModel.create({
          login,
          password,
          age
        })
        user = await UserModel.findOne({
          where: {
            login
          }
        })
        const result = await UserGroupModel.create({
          user_id: user.id,
          group_id: groupId
        })
        return result;
      } catch (error) {
        console.log("======", error)
      }
      
  }

  async updateUser ({id, login, age, groupId}) {
    try {
      const user = await this.getUserById(id);
      if (!user) {
        throw new HttpException({ code: 100001});
      }
      await UserModel.update({
        login,
        age
      })
      await UserGroupModel.update({
        group_id: groupId
      }, {
        where: { user_id: id }
      });
        
    } catch (error) {
    console.log("========", error)
    }
  }
    
  async deleteUser (id) {
      try {
          // 用户存在？
      const user = await this.getUserById(id);
      if (!user) {
        throw new HttpException({ code: 100001});
      }
      await UserModel.update({
        is_deleted: 1
      })
      const res = await UserGroupModel.destroy({
        group_id: groupId
      }, {
        where: { user_id: id }
      });
      return res;
      } catch (error) {
        console.log("========", error)
      }
  }

  async getUserById(id) {
    const user = await UserModel.findByPk(id);
    return user;
  }
}
 export { UserService }
