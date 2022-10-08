import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Table,
  Box,
  Button,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  RefObject,
  useState,
  useEffect,
} from "react";
import { IUser } from "../App";
import { useScroll } from "./../hooks/useScroll";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  users: IUser[];
  getNewUsers: () => void;
  newUser: IUser | null;
}

function BasicTable({ users, setOpen, getNewUsers, newUser }: IProps) {
  let [tableList, setTableList] = useState<JSX.Element[]>([]);

  let loadUsersOnScroll = (elemRef: RefObject<HTMLDivElement>) => {
    if (elemRef.current) {
      let bottom = elemRef.current.scrollHeight - elemRef.current.clientHeight;
      if (bottom - elemRef.current.scrollTop <= 30) getNewUsers();
    }
  };

  const createListItems = (usersInfo: IUser[]) => {
    let newList = usersInfo.map((row) => (
      <TableRow
        key={row.id}
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          "& td": {
            maxWidth: 110,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
        }}
      >
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.surname}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.birthday}</TableCell>
        <TableCell>{row.weight}</TableCell>
        <TableCell>{row.height}</TableCell>
        <TableCell>{row.sex}</TableCell>
        <TableCell>{row.eyeColor}</TableCell>
      </TableRow>
    ));
    return newList;
  };

  useEffect(() => {
    if (users.length) {
      const newList = createListItems(users);
      setTableList((prev) => [...prev, ...newList]);
    }
  }, [users]);

  useEffect(() => {
    if (newUser) {
      const newList = createListItems([newUser]);
      setTableList((prev) => [...newList, ...prev]);
    }
  }, [newUser]);

  const tableRef = useScroll<HTMLDivElement>(loadUsersOnScroll);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        width: "100%",
        margin: "0px auto",
      }}
      className="animate__animated animate__backInDown"
    >
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 0, height: 650, minHeight: 250 }}
        ref={tableRef}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ "& th": { width: 110 } }}>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Last Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Eye Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableList}</TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        sx={{ borderRadius: 0 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Додати запис
      </Button>
    </Box>
  );
}

export default BasicTable;
