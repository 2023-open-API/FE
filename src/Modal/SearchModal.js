import React, { useState } from "react";
import { Modal, Fade, Typography, TextField, Button } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import { Autocomplete } from "@mui/lab";

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
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  searchInput: {
    flexGrow: 1,
    marginRight: "10px",
  },
  searchButton: {
    marginLeft: "10px",
  },
  alert: {
    marginTop: "10px",
    color: "red",
  },
}));

const theme = createTheme();

function SearchModal({ isOpen, handleCloseModal, lectureData, onSearch }) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      onSearch(searchQuery);
      handleCloseModal(); // 검색 후 모달 닫기
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal className={classes.modal} open={isOpen} onClose={handleCloseModal}>
        <Fade in={isOpen}>
          <div className={classes.modalContent}>
            <Typography variant="h5">강의 검색</Typography>
            <div className={classes.searchContainer}>
              <TextField
                label="강의명"
                variant="outlined"
                className={classes.searchInput}
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.searchButton}
                onClick={handleSearch}
              >
                검색
              </Button>
            </div>
            {showAlert && (
              <Typography variant="body1" className={classes.alert}>
                강의명을 입력해주시길 바랍니다.
              </Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default SearchModal;
