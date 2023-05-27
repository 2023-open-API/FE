import React from "react";
import TimeTableApp from "./components/TimeTableApp";
import NavMenu from "./components/NavMenu";
import Home from "./Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./fonts/fonts.css";

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/timetable"} element={<TimeTableApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
