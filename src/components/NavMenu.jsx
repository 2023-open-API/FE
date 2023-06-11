import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#84A1C4",
    height: "70px",
    width: "100%",
    zIndex: 1,
  },
  navTitle: {
    float: "left",
    marginLeft: "40px",
    marginTop: "25px",
    color: "white",
    fontFamily: "Jamsil",
    fontWeight: 800,
  },
  navMenu: {
    textAlign: "right",
    height: "70px",
    lineHeight: "70px",
    marginRight: "40px",
  },
  navbtn: {
    marginRight: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "Jamsil",
    fontWeight: 400,
  },
}));

function NavMenu({ signeduser }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <nav>
        <h2 className={classes.navTitle}>PLANU</h2>
        <div className={classes.navMenu}>
          <Link className={classes.navbtn} to={{ pathname: "/" }}>
            HOME
          </Link>
          <Link className={classes.navbtn} to={{ pathname: "/timetable" }}>
            시간표
          </Link>
          <span className={classes.navbtn}>
            {localStorage.getItem("userName")}님
          </span>
        </div>
      </nav>
      {console.log(signeduser)}
    </div>
  );
}

export default NavMenu;
