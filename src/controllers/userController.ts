import { getUsers } from "../services/userService";
import { addUser } from "../services/userService";
import { IUser } from "./../App";

export const getUsersList = async (page: number) => {
  try {
    let users = await getUsers(page);
    return users.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addNewUser = async (user: IUser) => {
  try {
    let users = await addUser(user);
    return users.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
