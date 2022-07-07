import sequelize from '../config/db';
import { Op } from 'sequelize';
import { has, set, get } from 'lodash';
class Root{
    async getUsers (groupId, page, count1) {
        let userIds = [];
        const condition = {
          where: {
            username: {
              [Op.ne]: 'root'
            }
          },
          offset: page * count1,
          limit: count1
        };
        if (groupId) {
          const userGroup = await UserGroupModel.findAll({
            where: {
              group_id: groupId
            }
          });
          userIds = userGroup.map(v => v.user_id);
          set(condition, 'where.id', {
            [Op.in]: userIds
          });
        }
        const { rows, count } = await UserModel.findAndCountAll(condition);
    
        for (const user of rows) {
          const userGroup = await UserGroupModel.findAll({
            where: {
              user_id: user.id
            }
          });
          const groupIds = userGroup.map(v => v.group_id);
          const groups = await GroupModel.findAll({
            where: {
              id: {
                [Op.in]: groupIds
              }
            }
          });
          set(user, 'groups', groups);
        }
    
        return {
          users: rows,
          total: count
        };
      }
}