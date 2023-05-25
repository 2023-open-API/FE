import React, { useState, useEffect } from "react";
import TimeTable from "../Timetable/Table/TimeTable";
import ClassList from "../Timetable/ClassList/ClassList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  timetable: {
    flex: 1,
    position: "sticky",
    marginLeft: "50px",
    backgroundColor: "white",
    width: "500px",
    marginRight: "30px",
  },
  classlist: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    marginRight: "50px",
  },
  timetableTitle: {
    backgroundColor: "#A7C1E1",
    color: "white",
    height: "40px",
    lineHeight: " 40px",
    marginBottom: "20px",
    paddingLeft: "10px",
    marginTop: 0,
  },
  classlistTitle: {
    backgroundColor: "#A7C1E1",
    color: "white",
    height: "40px",
    paddingLeft: "10px",
    lineHeight: " 40px",
    marginBottom: "20px",
    marginTop: 0,
  },
}));

function TimeTableApp() {
  const classes = useStyles();
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
    <div className={classes.container}>
      <div className={classes.timetable}>
        <h3 className={classes.timetableTitle}>시간표</h3>
        <TimeTable
          selectedLectures={selectedLectures}
          onDeleteLecture={onDeleteLecture}
        />
      </div>
      <div className={classes.classlist}>
        <h3 className={classes.classlistTitle}>수업 정보</h3>
        <ClassList addLecture={addLecture} />
      </div>
    </div>
  );
}

export default TimeTableApp;
