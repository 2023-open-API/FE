import React from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    "& > button": {
      backgroundColor: "#A7C1E1",
      fontFamily: "Jamsil",
      fontWeight: 400,
    },
  },
  resetButton: {
    backgroundColor: "white",
    border: "none",
    color: "#A7C1E1",
  },
}));

const theme = createTheme();

const ModalButtons = ({
  handleOpenMajorModal,
  handleOpenGradeModal,
  handleOpenSearchModal,
  handleResetFilter,
}) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <div className={classes.buttonContainer}>
          <Button
            sx={{
              boxShadow: "none",
              borderRadius: "12px",
              marginRight: "20px",
            }}
            variant="contained"
            onClick={handleOpenMajorModal}
          >
            전공/영역
          </Button>
          <Button
            sx={{
              boxShadow: "none",
              borderRadius: "12px",
              marginRight: "20px",
            }}
            variant="contained"
            onClick={handleOpenGradeModal}
          >
            학년
          </Button>
          <Button
            sx={{
              boxShadow: "none",
              borderRadius: "12px",
              marginRight: "10px",
            }}
            variant="contained"
            onClick={handleOpenSearchModal}
          >
            검색
          </Button>
        </div>
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          className={classes.resetButton}
          onClick={handleResetFilter}
        >
          <Typography
            variant="button"
            component="span"
            sx={{
              color: "#A7C1E1",
              fontFamily: "Jamsil",
              fontWeight: 400,
              fontSize: "12px",
            }}
          >
            초기화
          </Typography>
          <RefreshIcon sx={{ color: "#A7C1E1" }} />
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default ModalButtons;
