import React from "react";
import { Modal, Fade, Typography } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FaTimes } from "react-icons/fa";

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
    flexGrow: 1,
  },
  chevronIcon: {
    marginLeft: "5px",
  },
  closeIcon: {
    fontSize: "15px",
    color: "#A7C1E1",
    margin: "6px",
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

  const grades = [1, 2, 3, 4];

  const handleSelectGrade = (grade) => {
    handleGradeSelect(grade);
    handleCloseModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal className={classes.modal} open={isOpen} onClose={handleCloseModal}>
        <Fade in={isOpen}>
          <div className={classes.modalContent}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginBottom: "25px",
                  fontFamily: "Jamsil",
                  fontWeight: 400,
                }}
                variant="h5"
              >
                학년 선택
              </Typography>
              <FaTimes
                onClick={handleCloseModal}
                className={classes.closeIcon}
              />
            </div>

            {grades.map((grade) => (
              <div
                key={grade}
                className={classes.listItem}
                onClick={() => handleSelectGrade(grade)}
              >
                <Typography
                  style={{ fontFamily: "Jamsil", fontWeight: 300 }}
                  variant="body1"
                  className={classes.listItemText}
                >
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
