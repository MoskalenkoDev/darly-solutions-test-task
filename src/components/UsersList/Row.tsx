import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import { IUser } from "../UsersList";

interface IProps {
  row: IUser;
}

function Row({ row }: IProps) {
  return (
    <TableRow
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
  );
}

export default memo(Row);
