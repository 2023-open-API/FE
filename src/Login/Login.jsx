import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../api/api";

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
}`;

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

function Login({ setLoginPage }) {
  const classes = useStyles();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#84A1C4";
    return () => {
      document.body.style.backgroundColor = "#e7e7e7";
    };
  }, []);

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!studentId || !password) {
        alert("학번과 비밀번호를 모두 입력해주세요.");
        return;
      } else {
        const userInfo = {
          studentId: Number(studentId),
          password: password,
        };
        console.log(userInfo);
        const response = await authUser(userInfo);
        if (response && response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setLoginPage(userInfo);
          alert("로그인되었습니다.");
          navigate("/");
        } else {
          alert("아이디와 비밀번호를 다시 확인해주세요.");
        }
      }
    } catch (error) {
      console.log(error);
      alert("로그인에 실패하셨습니다.");
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>PLANU</h1>
      <form className={classes.form}>
        <StyledInput
          type="text"
          placeholder="학번"
          onChange={handleStudentIdChange}
          name="studentId"
        />
        <StyledInput
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          name="password"
        />
        <StyledButton
          type="button"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </StyledButton>
      </form>
      <Link className={classes.signup} to={{ pathname: "/signup" }}>
        Sign up
      </Link>
    </div>
  );
}

export default Login;
