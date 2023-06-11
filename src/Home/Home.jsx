import React from "react";
import TimeTableApp from "../components/TimeTableApp";
import { makeStyles } from "@mui/styles";
import TodoTemplate from "../todo/TodoTemplate";
import MainCalendar from "../Calendar/maincalendar"

const useStyles = makeStyles({
  container: {},
  tableContainer: {
    width: "510px",
    height: "480px",
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: "10px",
  },
  table: {},
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
        <MainCalendar view="month"/>
      </div>
    </div>
  );
}

export default Home;
