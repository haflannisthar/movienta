import { useContext } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { MovieContext } from "../Context/Context";

export default function ThemeProvider({ children }) {
  const { darkMode } = useContext(MovieContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#030A1B" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#030A1B",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
