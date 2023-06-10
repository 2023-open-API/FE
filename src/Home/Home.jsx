import React from "react";
import TimeTableApp from "../components/TimeTableApp";
import { makeStyles } from "@mui/styles";
import TodoTemplate from "../todo/TodoTemplate";

const useStyles = makeStyles({
  table: {},
});

function Home() {
  const classes = useStyles();

  return (
    <div>
      <TodoTemplate />
      <div className={classes.table}>
        <TimeTableApp />
      </div>
    </div>
  );
}

export default Home;
