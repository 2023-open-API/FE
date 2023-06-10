import React from "react";
import TimeTableApp from "../components/TimeTableApp";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {},
});

function Home() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.table}>
        <TimeTableApp />
      </div>
    </div>
  );
}

export default Home;
