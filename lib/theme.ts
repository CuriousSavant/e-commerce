import { createTheme } from "@mui/material/styles";

const theme = () =>
  createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        dark: "#1e1e2f", // dasboard background
      },
      secondary: {
        main: "#0f63e9",
        dark: "#27293d", // eml in dashboard
      },
    },
    typography: {
      fontFamily: `"Noto Sans Thai", sans-serif`,
    },
    components: {
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