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
import { Dispatch, SetStateAction, RefObject } from "react";
import { IUser } from "../UsersList";
import { useScroll } from "../../hooks/useScroll";
import Row from "./Row";
import { memo } from "react";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  users: IUser[];
  getNewUsers: () => void;
}

function UsersTable({ users, setOpen, getNewUsers }: IProps) {
  const loadUsersOnScroll = (elemRef: RefObject<HTMLDivElement>) => {
    if (elemRef.current) {
      let bottom = elemRef.current.scrollHeight - elemRef.current.clientHeight;
      if (bottom - elemRef.current.scrollTop <= 30) getNewUsers();
    }
  };

  const tableRef = useScroll<HTMLDivElement>(loadUsersOnScroll);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        width: "100%",
        height: "100%",
      }}
      className="animate__animated animate__backInDown"
    >
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 0, height: 650 }}
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
          <TableBody>
            {users.map((row) => (
              <Row row={row} key={row.id} />
            ))}
          </TableBody>
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

export default memo(UsersTable);
