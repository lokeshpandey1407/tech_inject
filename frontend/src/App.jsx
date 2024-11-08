import { Toaster } from "react-hot-toast";
import "./index.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Container>
      <Navbar />
      <Box
        style={{
          maxWidth: "1100px",
          margin: "2rem auto 2rem auto",
          paddingInline: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
        <Toaster />
      </Box>
    </Container>
  );
}

export default App;
