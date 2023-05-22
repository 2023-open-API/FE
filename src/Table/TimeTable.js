import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TimeTableRow from "./TimeTableRow";
import TableContainer from "@mui/material/TableContainer";

const useStyles = makeStyles({
  container: {
    width: "80%",
    maxWidth: "650px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    boxShadow: "none",
  },
  tableContainer: {
    border: "1px solid #ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  table: {
    borderSpacing: 0,
    "& th, & td": {
      border: "1px solid #ccc",
      padding: 10,
      textAlign: "left",
    },
  },
});

function TimeTable({ selectedLectures }) {
  const classes = useStyles();
  const daysOfWeek = ["월", "화", "수", "목", "금"];
  const hoursOfDay = Array.from({ length: 14 }, (_, index) => index + 9);

  return (
    <div className={classes.container}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>시간</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {hoursOfDay.map((startHour) => (
              <TimeTableRow
                key={startHour}
                startHour={startHour}
                endHour={startHour + 1}
                daysOfWeek={daysOfWeek}
                selectedLectures={selectedLectures}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TimeTable;
