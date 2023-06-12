import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Home from "./Home/Home";
import Login from "./Login/Login";
import TimeTableApp from "./components/TimeTableApp";
import Signup from "./Login/Signup";
import "./fonts/fonts.css";
import "./app.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signeduser, setSignedUser] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({
    userId: "",
    password: "",
  });

  const setLoginPage = (userInfo) => {
    setIsLoggedIn(true);
    setLoggedInUser(userInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        {isLoggedIn && (
          <div>
            <NavMenu signeduser={signeduser} />
          </div>
        )}
        <Routes>
          {!isLoggedIn && (
            <Route path="/" element={<Login setLoginPage={setLoginPage} />} />
          )}
          {!isLoggedIn && (
            <Route
              path="/signup"
              element={<Signup setSignedUser={setSignedUser} />}
            />
          )}
          {isLoggedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/timetable" element={<TimeTableApp />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
