import React from "react";
import { Modal, Fade, Typography } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    outline: "none",
    width: "300px",
    overflow: "auto",
    maxHeight: "50vh",
  },
  list: {
    listStyle: "none",
    padding: "10px",
    margin: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  listItemText: {
    marginRight: "5px",
  },
}));

const theme = createTheme();

function MajorModal({ isOpen, handleCloseModal, majorData, onSelect }) {
  const classes = useStyles();

  const uniqueDepartments = Array.from(
    new Set(majorData.map((lecture) => lecture.department))
  ).sort((a, b) => {
    const removeVowels = (str) => str.replace(/[aeiou]/gi, "");
    const departmentA = removeVowels(a);
    const departmentB = removeVowels(b);
    return departmentA.localeCompare(departmentB);
  });

  const handleMajorSelect = (major) => {
    onSelect(major);
    handleCloseModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal className={classes.modal} open={isOpen} onClose={handleCloseModal}>
        <Fade in={isOpen}>
          <div className={classes.modalContent}>
            <Typography
              style={{
                fontSize: "20px",
                marginBottom: "20px",
                fontFamily: "Jamsil",
                fontWeight: 400,
              }}
              variant="h5"
            >
              전공/영역
            </Typography>
            <ul className={classes.list}>
              {uniqueDepartments.map((department) => (
                <li
                  key={department}
                  className={classes.listItem}
                  onClick={() => handleMajorSelect(department)}
                >
                  <Typography
                    className={classes.listItemText}
                    variant="body1"
                    style={{ fontFamily: "Jamsil", fontWeight: 300 }}
                  >
                    {department}
                  </Typography>
                  <ChevronRightIcon />
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default MajorModal;
