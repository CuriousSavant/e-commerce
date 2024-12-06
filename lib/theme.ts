import { createTheme } from "@mui/material/styles";

const theme = () =>
  createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#635bff",
      },
    },
    typography: {
      fontFamily: `"Noto Sans Thai", sans-serif`,
    },
  });

export default theme;
