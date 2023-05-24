import React, { useState, useEffect } from "react";
import TimeTable from "./Table/TimeTable";
import ClassList from "./ClassList/ClassList";

function TimeTableApp() {
  const [selectedLectures, setSelectedLectures] = useState([]);

  useEffect(() => {
    const storedLectures = localStorage.getItem("selectedLectures");
    if (storedLectures) {
      setSelectedLectures(JSON.parse(storedLectures));
    }
  }, []);

  const addLecture = (lecture) => {
    if (!selectedLectures.find((selected) => selected.id === lecture.id)) {
      const updatedLectures = [...selectedLectures, lecture];
      setSelectedLectures(updatedLectures);
      localStorage.setItem("selectedLectures", JSON.stringify(updatedLectures));
    } else {
      alert("이미 추가된 강의입니다.");
    }
  };

  const onDeleteLecture = (lectureName) => {
    setSelectedLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.name !== lectureName)
    );
  };

  return (
    <div>
      <h2>강의 시간표</h2>
      <TimeTable
        selectedLectures={selectedLectures}
        onDeleteLecture={onDeleteLecture}
      />
      <h2>강의 목록</h2>
      <ClassList addLecture={addLecture} />
    </div>
  );
}

export default TimeTableApp;
