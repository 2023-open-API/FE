import React from "react";
import { Button } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";
import SearchModal from "../Modal/SearchModal";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    "& > button": {
      backgroundColor: "#A7C1E1", // A7C1E1 색상 설정
      marginRight: "20px",
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
        <Button variant="contained" onClick={handleOpenMajorModal}>
          전공/영역
        </Button>
        <Button variant="contained" onClick={handleOpenGradeModal}>
          학년
        </Button>
        <Button variant="contained" onClick={handleOpenSearchModal}>
          검색
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default ModalButtons;
