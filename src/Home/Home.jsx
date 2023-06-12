import React from "react";
import TimeTableApp from "../components/TimeTableApp";
import { makeStyles } from "@mui/styles";
import TodoTemplate from "../todo/TodoTemplate";
import MainCalendar from "../Calendar/maincalendar";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  tableContainer: {
    width: "360px",
    height: "480px",
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: "10px",
  },
  table: {
    margin: "0",
  },
  calendarContainer: {
    marginTop: "32px",
    width: "780px",
    height: "560px",
    marginBottom: "32px",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <TodoTemplate />
      </div>
      <div className={classes.tableContainer}>
        <div className={classes.table}>
          <TimeTableApp />
        </div>
      </div>
      <div>
        <MainCalendar view="month" />
      </div>
    </div>
  );
}

export default Home;
