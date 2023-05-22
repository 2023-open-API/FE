import React, { useState } from "react";
import TimeTable from "./Table/TimeTable";
import ClassList from "./ClassList/ClassList";

function TimeTableApp() {
  const [selectedLectures, setSelectedLectures] = useState([]);

  const addLecture = (lecture) => {
    setSelectedLectures([...selectedLectures, lecture]);
  };

  return (
    <div>
      <h2>강의 시간표</h2>
      <TimeTable selectedLectures={selectedLectures} />
      <h2>강의 목록</h2>
      <ClassList addLecture={addLecture} />
    </div>
  );
}

export default TimeTableApp;
