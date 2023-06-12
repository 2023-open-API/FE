import React, { useState, useEffect } from "react";
import TimeTable from "../Timetable/Table/TimeTable";
import ClassList from "../Timetable/ClassList/ClassList";
import { makeStyles } from "@mui/styles";
import Loading from "../Timetable/Loading/Loading";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    marginLeft: "40px",
    marginTop: "30px",
  },
  timetable: {
    position: "sticky",
    width: "600px",
    marginRight: "30px",
    marginLeft: 0,
  },
  classlist: {
    position: "relative",
    height: "85vh",
    marginBottom: "30px",
    backgroundColor: "white",
    marginLeft: 0,
  },
  timetableTitle: {
    backgroundColor: "#A7C1E1",
    color: "white",
    height: "40px",
    lineHeight: " 40px",
    paddingLeft: "10px",
    marginTop: 0,
    marginBottom: 0,
    fontFamily: "Jamsil",
    fontWeight: 500,
  },
  classlistTitle: {
    backgroundColor: "#A7C1E1",
    color: "white",
    height: "40px",
    paddingLeft: "10px",
    lineHeight: " 40px",
    marginBottom: "20px",
    marginTop: 0,
    fontFamily: "Jamsil",
    fontWeight: 500,
  },
}));

function TimeTableApp() {
  const location = useLocation();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedLectures, setSelectedLectures] = useState([]);

  useEffect(() => {
    const storedLectures = localStorage.getItem("selectedLectures");
    if (storedLectures) {
      setSelectedLectures(JSON.parse(storedLectures));
    }
  }, []);

  const onDeleteLecture = (lectureName) => {
    setSelectedLectures((selectedLectures) => {
      const updatedLectures = selectedLectures.filter(
        (lecture) => lecture.name !== lectureName
      );
      localStorage.setItem("selectedLectures", JSON.stringify(updatedLectures));
      return updatedLectures;
    });
  };

  const addLecture = (lecture) => {
    if (!selectedLectures.find((selected) => selected.code === lecture.code)) {
      const updatedLectures = [...selectedLectures, lecture];
      setSelectedLectures(updatedLectures);
      localStorage.setItem("selectedLectures", JSON.stringify(updatedLectures));
    } else {
      alert("이미 추가된 강의입니다.");
    }
  };

  return (
    <div className={classes.container}>
      {loading && location.pathname === "/timetable" && <Loading />}
      <div className={classes.timetable}>
        <h3 className={classes.timetableTitle}>시간표</h3>
        <TimeTable
          selectedLectures={selectedLectures}
          onDeleteLecture={onDeleteLecture}
        />
      </div>
      {location.pathname === "/timetable" && (
        <div className={classes.classlist}>
          <h3 className={classes.classlistTitle}>수업 정보</h3>
          <ClassList addLecture={addLecture} setLoading={setLoading} />
        </div>
      )}
    </div>
  );
}

export default TimeTableApp;
