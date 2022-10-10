import axios from "axios";
import { IUser } from "../components/UsersList";

const API_URL = "http://localhost:3001";

export const getUsers = (page: number) => {
  return axios.get<IUser[] | []>(
    `${API_URL}/users?_page=${page}&_limit=20&_sort=id&_order=desc`
  );
};

export const addUser = (user: IUser) => {
  return axios.post<IUser>(`${API_URL}/users`, user);
};
