import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/Context";
import UserDataService from "../services/UserDataService"

// MUI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from '@mui/material/Snackbar';

function App(props) {
  // Store input field data, user name and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState({open: false, msg: ""});

  const { auth, setAuth } = useContext(AuthContext);

  // Send studentNumber and password to the serverfor initial authentication
  const authenticate = async () => {
    try {
      //call api
      const res = await UserDataService.login(email, password);
      //process the response
      setShowToast({open: true, msg: res.data.msg});
      if (res.data.success) {
        // set auth context as user data and auth token
        setAuth({ user: res.data.user, token: res.data.token });
        saveAuth(res.data.user, res.data.token);
        props.history.push('/home');
        window.location.reload(); //fixes navigation use where user is undefined until app rerenders
      }
    } catch (e) {
      props.history.push('/error');
    }
  };

  const saveAuth = (user, token) => {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
  }, [auth]);

  return (
      <Container component="main" maxWidth="sm">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showToast?.open}
          message={showToast?.msg}
          onClose={() => {setShowToast({open: false, msg: ""})}}
        />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="eamil"
                  value={email}
                  onChange={(e) => {
                    setEmail( e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={authenticate}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Register here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default App;
