import { Model, Sequelize } from 'sequelize';
import { merge } from 'lodash';
import sequelize from '../config/db';

class Group extends Model {}

Group.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
      type: Sequelize.STRING(60),
      allowNull: false,
      comment: '分组名称'
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: true,
      comment: '分组描述'
    }
  },
  merge(
    {
      sequelize,
      tableName: 'group',
      modelName: 'group'
    }
  )
);

export { Group as GroupModel };
