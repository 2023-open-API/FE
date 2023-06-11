import React, { useState } from "react";
import { Modal, Fade, Typography, TextField, Button } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import { FaTimes } from "react-icons/fa";

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
    width: "400px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    justifyContent: "space-between",
  },
  searchInput: {
    flexGrow: 1,
    width: "100%",
  },
  closeButton: {
    padding: "5px",
    cursor: "pointer",
  },
  alert: {
    marginTop: "10px",
    color: "red",
  },
  closeIcon: {
    fontSize: "15px",
    color: "#A7C1E1",
    marginLeft: "5px",
  },
}));

const theme = createTheme();

function SearchModal({
  isOpen,
  handleCloseModal,
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
                display: "flex",
                justifyContent: "space-between",
              }}
              variant="h5"
            >
              강의 검색
              <FaTimes
                onClick={handleCloseModal}
                className={classes.closeIcon}
              />
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
                  backgroundColor: "#A7C1E1",
                  boxShadow: "none",
                  fontFamily: "Jamsil",
                  fontWeight: 300,
                  marginLeft: 20,
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
