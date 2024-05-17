import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#f33",
      disabled: "#733",
    },
    secondary: {
      main: "#33f",
    },
  },
});

export default theme;