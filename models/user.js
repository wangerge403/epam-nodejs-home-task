// import { v4 as uuid } from 'uuid'

// const id = uuid().replace(/-/g, '');

// const usersSQL = [
//     {
//         id: "",
//         login: "",
//         password: "",
//         age: "",
//         isDeleted: false
//     }
// ]
// class UserModel {
//   async createUser({login, password, age}) {
//     usersSQL.push({
//       id,
//       login,
//       password,
//       age,
//       isDeleted: false
//     })
//     return true;

//   }

//   async reGetUser(id) {
//     const currentUser = usersSQL.find((item) => {return item.id === id });
//     return currentUser;
//   }

//   // 删除指定用户
//   async deleteUser(id) {
//     usersSQL.forEach(item => {
//       if(item.id === id) {
//         item.isDeleted = true;
//       }
//     });
      
//   }
//   // 更新用户信息
//   async updateUser({login, password, age}) {
//     usersSQL.forEach(item => {
//       if(item.login=== login && item.password === password) {
//         item.age = age;
//       }
//     });


//      return false; 
//   }
// }

// export default UserModel;

import { Sequelize, Model } from "sequelize";

class UserModel extends Model{};


UserModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  login: {
    type: Sequelize.STRING(500),
    comment: '用户名'
  },
  password: {
    type: Sequelize.STRING(500),
    allowNull: false,
    comment: '密码'
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否被删除; 0: 未删除; 1已删除'
  }
},
merge(
  {
    sequelize,
    tableName: 'user',
    modelName: 'UserModel'
  }
)
)

export { UserModel };
