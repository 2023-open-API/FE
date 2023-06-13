import React from "react";
import TimeTableApp from "../components/TimeTableApp";
import { makeStyles } from "@mui/styles";
import TodoTemplate from "../todo/TodoTemplate";
import MainCalendar from "../Calendar/maincalendar";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100vw",
  },

  tableContainer: {
    width: "30vw",
    marginLeft: "3vw",
    marginRight: "3vw",
    height: "500px",
    overflowY: "auto",
    overflowX: "hidden",
    marginBottom: "3vh",
    marginTop: "20px",
  },

  calendarContainer: {
    marginTop: "3vh",
    width: "61vw",
    marginBottom: "3vh",
    marginRight: "3vw",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.todoContainer}>
          <TodoTemplate />
        </div>
        <div className={classes.tableContainer}>
          <TimeTableApp />
        </div>
      </div>
      <div className={classes.calendarContainer}>
        <MainCalendar view="month" />
      </div>
    </div>
  );
}

export default Home;
