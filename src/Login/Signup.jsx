import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { addUser, authUser } from "../api/api";

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

const StyledButton = styled.button`
  margin-top: 60px;
  border: none;
  background-color: #607b9b;
  color: #cee0f4;
  width: 300px;
  height: 50px;
  font-size: 20px;
  border-radius: 30px;
  margin-bottom: 40px;
  font-family: "Jamsil";
  font-weight: 400;
  transition: all 0.9s, color 0.3;

  &:hover {
    border: 3px solid #607b9b;
    background-color: #cee0f4;
    color: #607b9b;
  }
`;

function Signup({ setSignedUser }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const userInfo = {
        name: name,
        studentId: Number(studentId),
        password: password,
      };

      localStorage.setItem("userName", userInfo.name);
      setSignedUser(userInfo);
      await addUser(userInfo);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("서버 응답 오류가 발생했습니다.");
      } else if (error.request) {
        console.log(error.request);
        alert("요청이 전송되지 않았습니다.");
      } else {
        console.log("Error", error.message);
        alert("오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#84A1C4";
    return () => {
      document.body.style.backgroundColor = "#e7e7e7";
    };
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Sign Up</h1>
      <form>
        <div>
          <label className={classes.labels}>이름</label>
          <StyledInput type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label className={classes.labels}>학번</label>
          <StyledInput
            type="text"
            value={studentId}
            onChange={handleStudentIdChange}
          />
        </div>
        <div>
          <label className={classes.labels}>e-learning password</label>
          <StyledInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </form>

      <StyledButton onClick={handleSignup}>Sign up</StyledButton>
      <Link className={classes.login} to={{ pathname: "/" }}>
        Login
      </Link>
    </div>
  );
}

export default Signup;
