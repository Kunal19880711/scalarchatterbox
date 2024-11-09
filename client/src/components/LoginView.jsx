import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { FormState } from "../common/constants";

const LoginView = ({ identity, setIdentity, appName, formState }) => {
  const [username, setUsername] = useState("");
  const [isShowError, setIsShowError] = useState(false);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsShowError(false);
  };

  useEffect(() => {
    switch (formState) {
      case FormState.Pending:
        setIsShowError(false);
        break;
      case FormState.Success:
        setUsername("");
        setIsShowError(false);
        break;
      case FormState.Failed:
        setIsShowError(true);
        break;
    }
  }, [formState]);

  return (
    <Drawer anchor="top" open={!identity} transitionDuration={{ exit: 500 }}>
      <Container
        className="login"
        maxWidth="xl"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="header"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          Welcome to {appName}.
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Welcome to {appName}.
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
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
            onChange={onUsernameChange}
            sx={{
              backgroundColor: "white",
              p: 1,
            }}
          />
          <IconButton
            type="submit"
            color="primary"
            aria-label="send"
            sx={{ m: 1, ml: -1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>

        {isShowError && (
          <Typography
            component="p"
            variant="subtitle2"
            color="error"
            sx={{ fontSize: "medium", pl: 2, pr: 2, backgroundColor: "white" }}
          >
            Name {username} already been taken! Use different name.
          </Typography>
        )}
      </Container>
    </Drawer>
  );
};

export default LoginView;
