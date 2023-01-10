import { Sequelize, Model } from "sequelize";
import sequelize from "../config/db";
import { merge } from 'lodash';

class User extends Model{};


User.init({
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
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '年龄'
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
    modelName: 'user'
  }
)
)

export { User as UserModel };
