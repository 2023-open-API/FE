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
    boxShadow: "none",
  },
  tableContainer: {},

  table: {
    borderSpacing: 0,
    borderBottom: "none",
    height: "80vh",
    "& th, & td": {
      padding: 0,
      textAlign: "center",
      fontFamily: "Jamsil",
      fontWeight: 200,
    },
    "& th:not(:last-child), td:not(:last-child)": {
      borderRight: "1px solid #ccc",
    },
  },
});

function TimeTable({ selectedLectures, onDeleteLecture }) {
  const classes = useStyles();
  const daysOfWeek = ["월", "화", "수", "목", "금"];
  const hoursOfDay = Array.from({ length: 15 }, (_, index) => index + 9);

  return (
    <div className={classes.container}>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        elevation={0}
      >
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
                onDeleteLecture={onDeleteLecture}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TimeTable;
