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
    return group;
  }
  // update group
  async updateGroup ({id, groupName, permissions }) {
    const group = await this.getGroupById(id);
    if (!group) {
      throw new HttpException({ code: 400001});
    }
    group.name = groupName;
    group.permissions = permissions;
    await group.save();
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
      await GroupModel.create(
        {
          group_name: groupName,
          permissions
        },
        {
          transaction
        }
      );
      await transaction.commit();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
    }
    return true;
  }
  // delete(remove) group
  async deleteGroup (id) {
    const group = await GroupModel.findByPk(id);
    // 不存在
    if (!group) {
      throw new HttpException({ code: 400001});
    }
    // 权限？？
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
      await UserGroupModel.destroy({
        where: {
          group_id: group.id
        },
        transaction
      });
      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
    }
  }
}


export { GroupService }