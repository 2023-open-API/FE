import React from "react";
import { Button } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    "& > button": {
      backgroundColor: "#A7C1E1",
      marginRight: "20px",
      fontFamily: "Jamsil",
      fontWeight: 400,
    },
  },
}));

const theme = createTheme();

const ModalButtons = ({
  handleOpenMajorModal,
  handleOpenGradeModal,
  handleOpenSearchModal,
}) => {
  const classes = useStyles();
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.buttonContainer}>
        <Button
          sx={{ boxShadow: "none", borderRadius: "12px" }}
          variant="contained"
          onClick={handleOpenMajorModal}
        >
          전공/영역
        </Button>
        <Button
          sx={{ boxShadow: "none", borderRadius: "12px" }}
          variant="contained"
          onClick={handleOpenGradeModal}
        >
          학년
        </Button>
        <Button
          sx={{ boxShadow: "none", borderRadius: "12px" }}
          variant="contained"
          onClick={handleOpenSearchModal}
        >
          검색
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default ModalButtons;
