import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "70px",
    marginBottom: "80px",
    fontFamily: "Jamsil",
    color: "white",
    fontWeight: 800,
  },
  labels: {
    display: "inline-block",
    fontFamily: "Jamsil",
    fontWeight: 400,
    fontSize: "20px",
    color: "#607B9B",
    width: "150px",
    marginRight: "20px",
  },
  signupbtn: {
    marginTop: "60px",
    border: "none",
    backgroundColor: "#607B9B",
    color: "#CEE0F4",
    width: "300px",
    height: "50px",
    fontSize: "20px",
    borderRadius: "30px",
    marginBottom: "40px",
    fontFamily: "Jamsil",
    fontWeight: 400,
  },
  login: {
    color: "#607B9B",
    fontSize: "16px",
    fontFamily: "Jamsil",
    fontWeight: 400,
  },
}));

const StyledInput = styled.input`
  width: 300px;
  text-align: center;
  height: 50px;
  margin-bottom: 20px;
  border: none;
  border-radius: 30px;

  ::placeholder {
    font-family: Jamsil;
    font-weight: 400;
    color: #999999;
    font-size: 16px;
    color: #607b9b;
  }
`;

function Signup() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#84A1C4";
    return () => {
      document.body.style.backgroundColor = "#e7e7e7";
    };
  }, []);

  const moveToLogin = () => {
    navigate("/login");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.password);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Sign Up</h1>
      <form>
        <div>
          <label className={classes.labels}>이름</label>
          <StyledInput type="text" value={name} />
        </div>
        <div>
          <label className={classes.labels}>학번</label>
          <StyledInput type="text" value={id} />
        </div>
        <div>
          <label className={classes.labels}>e-learning password</label>
          <StyledInput type="password" value={password} />
        </div>
      </form>

      <button className={classes.signupbtn} type="submit" onClick={moveToLogin}>
        Sign up
      </button>
      <Link className={classes.login} to="/login">
        Login
      </Link>
    </div>
  );
}

export default Signup;
