import React, { useState } from "react";
import { Modal, Fade, Typography, TextField, Button } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";

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
  alert: {
    marginTop: "10px",
    color: "red",
  },
}));

const theme = createTheme();

function SearchModal({
  isOpen,
  handleCloseModal,
  lectureData,
  onSearch,
  searchQuery,
  setSearchQuery,
}) {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      onSearch(searchQuery);
      handleCloseModal();
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
            <Typography
              style={{
                marginBottom: "30px",
                fontSize: "20px",
                fontFamily: "Jamsil",
                fontWeight: 400,
              }}
              variant="h5"
            >
              강의 검색
            </Typography>
            <div className={classes.searchContainer}>
              <TextField
                label="강의명을 입력하세요"
                variant="outlined"
                className={classes.searchInput}
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{
                  marginLeft: "20px",
                  backgroundColor: "#A7C1E1",
                  boxShadow: "none",
                  fontFamily: "Jamsil",
                  fontWeight: 300,
                }}
              >
                검색
              </Button>
            </div>
            {showAlert && (
              <Typography
                variant="body1"
                className={classes.alert}
                style={{ fontFamily: "Jamsil", fontWeight: 400 }}
              >
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
