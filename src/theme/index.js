export const themeOptions = {
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#33f3ba",
      main: "#00F0A9",
      dark: "#00a876",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FFFFFF",
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      default: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "1rem",
          textTransform: "none",
          borderRadius: 30,
        },
      },
    },
  },
};
