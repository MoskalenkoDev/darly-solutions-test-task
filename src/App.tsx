import { useEffect, useRef, useState } from "react";
import "./App.css";
import BasicTable from "./components/Table";
import AddRecordDialog from "./components/AddRecordDialog";
import { addNewUser, getUsersList } from "./controllers/userController";

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

function App() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const page = useRef(1);
  const isLoading = useRef(false);

  let getNewUsers = async () => {
    if (!isLoading.current) {
      isLoading.current = true;
      let usersList = await getUsersList(page.current);
      setUsers((prev) => [...prev, ...usersList]);
      page.current++;
      isLoading.current = false;
    }
  };

  useEffect(() => {
    getNewUsers();
  }, []);

  const addUser = async (userInfo: IUser) => {
    const userRecord = await addNewUser(userInfo);
    if (userRecord) setUsers((prev) => [userRecord, ...prev]);
  };

  return (
    <div className="App">
      <BasicTable setOpen={setOpen} users={users} getNewUsers={getNewUsers} />
      <AddRecordDialog isOpen={open} setOpen={setOpen} addUser={addUser} />
    </div>
  );
}

export default App;
