"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FAE900",
      contrastText: "#000000",
    },
    secondary: {
      main: "#f44336",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fff",
    },
  },
  colorSchemes: {},
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle2: "h6",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
  typography: {
    subtitle1: {
      fontSize: 18,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
    },
  },
});

export default theme;
