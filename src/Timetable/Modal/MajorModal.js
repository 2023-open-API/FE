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
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    outline: "none",
    width: "300px",
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

  const handleMajorSelect = (major) => {
    onSelect(major.major);
    handleCloseModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal className={classes.modal} open={isOpen} onClose={handleCloseModal}>
        <Fade in={isOpen}>
          <div className={classes.modalContent}>
            <Typography
              style={{ fontSize: "20px", marginBottom: "20px" }}
              variant="h5"
            >
              학과 선택
            </Typography>
            <ul className={classes.list}>
              {majorData.map((major) => (
                <li
                  key={major.id}
                  className={classes.listItem}
                  onClick={() => handleMajorSelect(major)}
                >
                  <Typography className={classes.listItemText} variant="body1">
                    {major.major}
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
