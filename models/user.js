import { v4 as uuid } from 'uuid'

const id = uuid().replace(/-/g, '');

const usersSQL = [
    {
        id: "",
        login: "",
        password: "",
        age: "",
        isDeleted: false
    }
]
class UserModel {
  async createUser({login, password, age}) {
    usersSQL.push({
      id,
      login,
      password,
      age,
      isDeleted: false
    })
    return true;

  }

  async reGetUser(id) {
    const currentUser = usersSQL.find((item) => {return item.id === id });
    return currentUser;
  }

  // 删除指定用户
  async deleteUser(id) {
    usersSQL.forEach(item => {
      if(item.id === id) {
        item.isDeleted = true;
      }
    });
      
  }
  // 更新用户信息
  async updateUser({login, password, age}) {
    usersSQL.forEach(item => {
      if(item.login=== login && item.password === password) {
        item.age = age;
      }
    });


     return false; 
  }
}

export default UserModel;