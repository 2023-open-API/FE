import React from "react";
import TimeTableApp from "../components/TimeTableApp";
import { makeStyles } from "@mui/styles";
import TodoTemplate from "../todo/TodoTemplate";
import MainCalendar from "../Calendar/maincalendar";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  todoAndTable: {
    marginRight: "40px",
  },
  todo: {
    width: "50vh",
  },
  tableContainer: {
    width: "53vh",
    height: "480px",
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: "10px",
  },
  table: {
    margin: "0",
    width: "54vh",
  },
  calendarContainer: {
    marginTop: "32px",
    width: "100vh",
    height: "560px",
    marginBottom: "32px",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.todoAndTable}>
        <div className={classes.todo}>
          <TodoTemplate />
        </div>
        <div className={classes.tableContainer}>
          <div className={classes.table}>
            <TimeTableApp />
          </div>
        </div>
      </div>
      <div className={classes.calendarContainer}>
        <MainCalendar view="month" />
      </div>
    </div>
  );
}

export default Home;
