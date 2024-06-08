"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap"
});

const theme = createTheme({
  palette: {
    background: {
      default: "#fefaf5"
    },
    purple: {
      main: "#6140ff",
      light: "#f6f5ff",
      dark: "#3f2f99",
      contrastText: "#ffffff"
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
});

export default theme;
