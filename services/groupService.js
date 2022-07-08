import { GroupModel } from '../models/groups';
import { UserGroupModel } from '../models/userGroup'
import HttpException from '../exception';

class GroupService {
  // get all groups
  async getAllGroup () {
    const { rows, count } = await GroupModel.findAndCountAll();
    return {
      groups: rows,
      total: count
    };
  }
  // get group by id
  async getGroupById(id){
    const group = await GroupModel.findByPk(id);
    if (group) {
      return group.toJSON();
    }
    return null;
  }
  // update group
  async updateGroup ({id, groupName, permissions }) {
    const group = await this.getGroupById(id);
    if (!group) {
      throw new HttpException({ code: 400001});
    }
    group.name = groupName;
    group.permissions = permissions;
    const result = GroupModel.update(group, {
      where: {
        id,
      }
    })
    return result;
  }
  // create group
  async createGroup ({groupName, permissions}) {
    const group = await GroupModel.findOne({
      where: {
        group_name: groupName
      }
    });
    // 已存在
    if (group) {
      throw new HttpException({ code: 400002});
    }

    let transaction;
    try {
      transaction = await sequelize.transaction();
      const ins = await GroupModel.create(
        {
          group_name: groupName,
          permissions
        },
        {
          transaction
        }
      );
      await transaction.commit();
      return ins.toJSON();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
    }
  }
  // delete(remove) group
  async deleteGroup (id) {
    const group = await GroupModel.findByPk(id);
    // 不存在
    if (!group) {
      throw new HttpException({ code: 400001});
    }
    let transaction;
    try {
      transaction = await sequelize.transaction();
      await group.destroy({
        transaction
      });
      await GroupModel.destroy({
        where: {
          id: group.id
        },
        transaction
      });
      const result = await UserGroupModel.destroy({
        where: {
          group_id: group.id
        },
        transaction
      });
      await transaction.commit();
      return result;
    } catch (error) {
      if (transaction) await transaction.rollback();
    }
  }
}


export { GroupService }