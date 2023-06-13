import React, { useEffect, useState } from "react";
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
import axios from "axios";
import SERVER from "../../api/url";

const useStyles = makeStyles({
  tableContainer: {
    border: "none",
    boxShadow: "none",
    minWidth: "1000px",
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
    divider: "#607B9B",
  },
});

function ClassList({ addLecture, setLoading }) {
  const classes = useStyles();
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [searchedLecture, setSearchedLecture] = useState(null);
  const [showNoResultAlert, setShowNoResultAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lectureData, setLectureData] = useState([]);
  const [courseTimeData, setCourseTimeData] = useState([]);

  const fetchLectureData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER}/api/applicationCourse/2022/2`
      );
      const lectureData = response.data;
      const courseTimeData = [];
      for (let i = 0; i < lectureData.length; i++) {
        courseTimeData.push(lectureData[i]["courseTimeResponses"]);
      }

      setCourseTimeData(courseTimeData);
      setLectureData(lectureData);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectureData();
  }, []);

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
    setSearchQuery("");
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
      alert("해당 강의는 없습니다");
    }
    setSearchQuery("");
  };

  const handleResetFilter = () => {
    setSelectedMajor(null);
    setSelectedGrade(null);
    setSearchedLecture(null);
    setShowNoResultAlert(false);
  };

  return (
    <div>
      <div style={{ position: "sticky", marginLeft: "20px" }}>
        <ModalButtons
          handleOpenMajorModal={handleOpenMajorModal}
          handleOpenGradeModal={handleOpenGradeModal}
          handleOpenSearchModal={handleOpenSearchModal}
          handleResetFilter={handleResetFilter}
        />
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <TableContainer
            component={Paper}
            className={classes.tableContainer}
            elevation={0}
            style={{ maxHeight: "690px", overflow: "auto" }}
          >
            <Table
              sx={{
                minWidth: 65,
                "& .MuiTableCell-root": {
                  borderBottom: "1.5px solid #A7C1E1",
                  textAlign: "center",
                  fontFamily: "Jamsil",
                  fontWeight: 300,
                },
                "& .MuiTableHead-root": {
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "#fff",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>학년</TableCell>
                  <TableCell>강의명</TableCell>
                  <TableCell>학수번호-분반</TableCell>
                  <TableCell>담당교수</TableCell>
                  <TableCell>학점</TableCell>
                  <TableCell>강의시간</TableCell>
                  <TableCell>추가</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchedLecture ? searchedLecture : lectureData)
                  .filter(
                    (lecture) =>
                      (selectedMajor === null ||
                        lecture.department === selectedMajor) &&
                      (selectedGrade === null ||
                        Number(lecture.grade) === selectedGrade)
                  )
                  .map((lecture, index) => (
                    <TableRow key={index}>
                      <TableCell>{lecture.grade}</TableCell>
                      <TableCell>{lecture.name}</TableCell>
                      <TableCell>{lecture.code}</TableCell>
                      <TableCell>{lecture.professor}</TableCell>
                      <TableCell>{lecture.credit}</TableCell>
                      <TableCell>
                        {courseTimeData[index].map((order, orderIndex) => (
                          <div key={orderIndex}>
                            {`${order.day} ${order.startTime}-${order.endTime}`}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => addLecture(lecture)}
                          style={{
                            fontFamily: "Jamsil",
                            fontWeight: 300,
                            border: 0,
                            backgroundColor: "#A7C1E1",
                            color: "white",
                            height: "25px",
                            width: "45px",
                            borderRadius: "5px",
                          }}
                        >
                          추가
                        </button>
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
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ClassList;
