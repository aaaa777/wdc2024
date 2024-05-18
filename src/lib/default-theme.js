import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#8C9AF5",
      disabled: "#565A75",
      select: "#5163FA",
      check: "#B7F58C",
    },
    secondary: {
      main: "#33f",
    },
    element: {
      normal: "#8C9AF5",
      selected: "#5163FA",
      locked: "#565A75",
      altNormal: "#B7F58C",
      altSelected: "#58EB0E",
      altLocked: "#637556",
    },
  },
});

export default theme;