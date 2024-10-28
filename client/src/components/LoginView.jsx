import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

const LoginView = ({ setIdentity }) => {
  const [username, setUsername] = useState("");

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.5s ease-in-out",
        transform: "translateY(0)",
      }}
      //   onExit={() => ({
      //     transform: "translateY(-100vh)",
      //   })}
    >
      <Typography variant="h1" component="h1" color="primary" gutterBottom>
        Welcome to ChatterBox.
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setIdentity(formData.get("username"));
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Enter your name to start"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <IconButton
          type="submit"
          color="primary"
          aria-label="send"
          sx={{ m: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default LoginView;
