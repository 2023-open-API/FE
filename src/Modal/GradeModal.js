import React from "react";
import { Modal, Fade, Typography } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    outline: "none",
    width: "300px",
  },
  listItem: {
    cursor: "pointer",
    margin: "15px",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItemText: {
    marginRight: "5px",
  },
  chevronIcon: {
    marginLeft: "5px",
  },
}));

const theme = createTheme();

function GradeModal({
  isOpen,
  selectedGrade,
  handleCloseModal,
  handleGradeSelect,
}) {
  const classes = useStyles();

  const grades = [1, 2, 3, 4]; // 학년 리스트

  const handleSelectGrade = (grade) => {
    handleGradeSelect(grade); // 학년 선택 시 handleGradeSelect 함수 호출
    handleCloseModal(); // 모달 닫기
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal className={classes.modal} open={isOpen} onClose={handleCloseModal}>
        <Fade in={isOpen}>
          <div className={classes.modalContent}>
            <Typography variant="h5">학년 선택</Typography>
            {grades.map((grade) => (
              <div
                key={grade}
                className={classes.listItem}
                onClick={() => handleSelectGrade(grade)} // 학년 선택 시 핸들러 호출
              >
                <Typography variant="body1" className={classes.listItemText}>
                  {grade}학년
                </Typography>
                <ChevronRightIcon className={classes.chevronIcon} />
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default GradeModal;
