import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Home from "./Home/Home";
import Login from "./Login/Login";
import TimeTableApp from "./components/TimeTableApp";
import Signup from "./Login/Signup";
import "./fonts/fonts.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    // 로그인 처리 로직 작성
    // ...
    setLoggedInUser(user);
    setIsLoggedIn(true);
  };

  return (
    <div className={isLoggedIn ? "app-logged-in" : "app-logged-out"}>
      <BrowserRouter>
        {isLoggedIn && <NavMenu loggedInUser={loggedInUser} />}
        <Routes>
          {!isLoggedIn && (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
          {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
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
