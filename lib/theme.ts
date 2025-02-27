import { createTheme } from "@mui/material/styles";

const theme = () =>
  createTheme({
    palette: {
      primary: {
        main: "#635bff",
        dark: "#1e1e2f", // dasboard background
      },
      secondary: {
        main: "#635bff",
        dark: "#27293d", // eml in dashboard
      },
      success: {
        main: "#00ff99",
      }
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
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "4px" }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "8px",
          }
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255,255,255,0.12)",
          }
        }
      }
    }
  });

export default theme;