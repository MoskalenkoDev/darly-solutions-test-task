import { useEffect, useRef, useState, useCallback } from "react";
import UsersTable from "./UsersTable";
import AddRecordDialog from "./AddRecordDialog";
import { addNewUser, getUsersList } from "../../controllers/userController";
import { Box } from "@mui/material";

export const eyeColor = ["brown", "blue", "green", "another"] as const;
export type eyeColorType = typeof eyeColor[number];

export const sex = ["male", "female", "helicopter"] as const;
export type sexType = typeof sex[number];

export interface IUser {
  firstName: string;
  surname: string;
  lastName: string;
  birthday: string;
  weight: number;
  height: number;
  sex: sexType;
  eyeColor: eyeColorType;
  id: string;
}

function UserList() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const page = useRef(1);
  const isLoading = useRef(false);

  let getNewUsers = useCallback(async () => {
    if (!isLoading.current) {
      isLoading.current = true;
      let usersList = await getUsersList(page.current);
      setUsers((prev) => [...prev, ...usersList]);
      page.current++;
      isLoading.current = false;
    }
  }, []);

  useEffect(() => {
    getNewUsers();
  }, []);

  const addUser = useCallback(async (userInfo: IUser) => {
    const userRecord = await addNewUser(userInfo);
    if (userRecord) setUsers((prev) => [userRecord, ...prev]);
  }, []);

  return (
    <Box
      sx={{
        overflow: "hidden",
        margin: "0px auto",
        height: "100%",
        minHeight: 250,
      }}
    >
      <UsersTable setOpen={setOpen} users={users} getNewUsers={getNewUsers} />
      <AddRecordDialog isOpen={open} setOpen={setOpen} addUser={addUser} />
    </Box>
  );
}

export default UserList;
