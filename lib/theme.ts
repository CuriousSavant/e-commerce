import { createTheme } from "@mui/material/styles";

const theme = () =>
  createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        "500": "#0f63e9"
      },
      secondary: {
        main: "#635bff",
      },
    },
    typography: {
      fontFamily: `"Noto Sans Thai", sans-serif`,
    },
    components:{
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px" }
        }
      }
    }
  });

export default theme;