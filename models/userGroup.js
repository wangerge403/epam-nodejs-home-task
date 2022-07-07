// UserGroup
// many to many

import { Model, Sequelize } from 'sequelize';
import sequelize from "../config/db";

class UserGroup extends Model {}

UserGroup.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: '分组id'
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'user_group',
    modelName: 'user_group',
  }
);

export { UserGroup as UserGroupModel };
