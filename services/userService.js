
import UserModel from '../models/user';
import md5 from "md5";

const userModel = new UserModel()

export const reGetUser = async (id) => {
    const res  = await userModel.reGetUser(id);
    return {
        code: 0,
        message: "success",
        data: res
    }
}

export const createUser = async ({login, password, age}) => {
    password = md5(password);
    await userModel.createUser({login, password, age});
    return {
        code: 0,
        message: "create success"
    }

}

export const updateUser = async (id) => {
    await userModel.updateUser(id);
    return {
        code: 0,
        message: "update success"
    }
}

export const deleteUser = async (id) => {
    await userModel.deleteUser(id);
    return {
        code: 0,
        message: "create success"
    }
}

