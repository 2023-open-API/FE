import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { makeStyles } from "@mui/styles";
import MajorModal from "../Modal/MajorModal";
import GradeModal from "../Modal/GradeModal";
import ModalButtons from "./ModalButtons";
import SearchModal from "../Modal/SearchModal";

const useStyles = makeStyles({
  tableContainer: {
    margin: "0 auto",
    border: "none",
    boxShadow: "none",
  },

  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    outline: "none",
  },
});

const theme = createTheme({
  palette: {
    divider: "#607B9B", // 구분선의 색상을 변경할 값
  },
});

const lectureData = [
  {
    id: 1,
    grade: 2,
    name: "수학",
    code: "MATH101-01",
    professor: "홍길동",
    day: ["월", "화"],
    startTime: "10:00",
    endTime: "12:00",
    credits: 3,
    major: "전자공학과",
  },
  {
    id: 2,
    grade: 3,
    name: "과학",
    code: "SCI201-02",
    professor: "이순신",
    day: ["수"],
    startTime: "14:00",
    endTime: "16:00",
    credits: 4,
    major: "컴퓨터공학과",
  },
  {
    id: 3,
    grade: 1,
    name: "영어",
    code: "ENG301-03",
    professor: "김철수",
    day: ["수"],
    startTime: "09:00",
    endTime: "11:00",
    credits: 2,
    major: "화학공학과",
  },
  // ...
];

function ClassList({ addLecture }) {
  const classes = useStyles();
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [searchedLecture, setSearchedLecture] = useState(null);
  const [showNoResultAlert, setShowNoResultAlert] = useState(false);

  const handleOpenMajorModal = () => {
    setIsMajorModalOpen(true);
  };

  const handleCloseMajorModal = () => {
    setIsMajorModalOpen(false);
  };

  const handleOpenGradeModal = () => {
    setIsGradeModalOpen(true);
  };

  const handleCloseGradeModal = () => {
    setIsGradeModalOpen(false);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleSelectMajor = (major) => {
    setSelectedMajor(major);
    handleCloseMajorModal();
  };

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    handleCloseGradeModal();
  };

  const handleSearchLecture = (lectureName) => {
    const result = lectureData.filter(
      (lecture) => lecture.name === lectureName
    );
    if (result.length > 0) {
      setSearchedLecture(result);
      setShowNoResultAlert(false);
    } else {
      setSearchedLecture(null);
      setShowNoResultAlert(true);
    }
  };

  return (
    <div>
      <ModalButtons
        handleOpenMajorModal={handleOpenMajorModal}
        handleOpenGradeModal={handleOpenGradeModal}
        handleOpenSearchModal={handleOpenSearchModal}
      />
      <ThemeProvider theme={theme}>
        <TableContainer
          component={Paper}
          className={classes.tableContainer}
          elevation={0}
        >
          <Table
            sx={{
              minWidth: 65,
              "& .MuiTableCell-root": {
                borderBottom: "1.5px solid #A7C1E1",
                textAlign: "center",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>학년</TableCell>
                <TableCell>강의명</TableCell>
                <TableCell>학수번호-분반</TableCell>
                <TableCell>담당교수</TableCell>
                <TableCell>강의시간</TableCell>
                <TableCell>학점</TableCell>
                <TableCell>추가</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchedLecture ? searchedLecture : lectureData)
                .filter(
                  (lecture) =>
                    (selectedMajor === null ||
                      lecture.major === selectedMajor) &&
                    (selectedGrade === null || lecture.grade === selectedGrade)
                )
                .map((lecture) => (
                  <TableRow key={lecture.id}>
                    <TableCell>{lecture.grade}</TableCell>
                    <TableCell>{lecture.name}</TableCell>
                    <TableCell>{lecture.code}</TableCell>
                    <TableCell>{lecture.professor}</TableCell>
                    <TableCell>{`${lecture.day.join(", ")} ${
                      lecture.startTime
                    }-${lecture.endTime}`}</TableCell>
                    <TableCell>{lecture.credits}</TableCell>
                    <TableCell>
                      <button onClick={() => addLecture(lecture)}>추가</button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <MajorModal
          isOpen={isMajorModalOpen}
          majorData={lectureData}
          selectedMajor={selectedMajor}
          handleCloseModal={handleCloseMajorModal}
          onSelect={handleSelectMajor}
        />
        <GradeModal
          isOpen={isGradeModalOpen}
          selectedGrade={selectedGrade}
          handleCloseModal={handleCloseGradeModal}
          handleGradeSelect={handleSelectGrade}
        />
        <SearchModal
          isOpen={isSearchModalOpen}
          handleCloseModal={handleCloseSearchModal}
          lectureData={lectureData}
          onSearch={handleSearchLecture}
        />

        {showNoResultAlert && (
          <Typography variant="body1" className={classes.alert}>
            해당 강의는 없습니다.
          </Typography>
        )}
      </ThemeProvider>
    </div>
  );
}

export default ClassList;
