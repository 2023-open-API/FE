import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
  },
  title: {
    fontSize: "90px",
    marginBottom: "80px",
    fontFamily: "Jamsil",
    color: "white",
    fontWeight: 800,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  loginbtn: {
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
  signup: {
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

function Login({ onLogin }) {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#84A1C4";
    return () => {
      document.body.style.backgroundColor = "#e7e7e7";
    };
  }, []);

  const moveToSignup = () => {
    navigate("/signup");
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>PLANU</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <StyledInput
          type="text"
          placeholder="학번"
          value={id}
          onChange={handleIdChange}
          name="id"
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          name="password"
        />
        <button className={classes.loginbtn} type="submit">
          Login
        </button>
      </form>
      <Link className={classes.signup} to="/signup">
        Sign up
      </Link>
    </div>
  );
}

export default Login;
