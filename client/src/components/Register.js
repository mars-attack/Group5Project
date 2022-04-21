import React, { useState } from "react";
import UserDataService from "../services/UserDataService";
// MUI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from '@mui/material/Snackbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function App(props) {

  // State Varaibles
  const [showToast, setShowToast] = useState({open: false, msg: ""});

  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    userType: 'nurse',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // API Call
    const res = await UserDataService.registerUser(user);
    setShowToast({open: true, msg: res.data.msg});
    // Navigate if success
    if (res.data.success) {
      props.history.push("/login");
    }
  };

  return (
      <Container component="main" maxWidth="sm">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showToast?.open}
          message={showToast?.msg}
          onClose={() => {
            setShowToast({ open: false, msg: "" });
          }}
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  autoComplete="full-name"
                  name="name"
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={user.address}
                  onChange={(e) => {
                    setUser({ ...user, address: e.target.value });
                  }}
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  autoComplete="email"
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
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  autoComplete="new-password"
                />
              </Grid>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ ml: 3, mt: 2 }}
                value={user.userType}
                onChange={(e) => {
                  setUser({ ...user, userType: e.target.value });
                }}
              >
                <FormControlLabel
                  value="nurse"
                  control={<Radio />}
                  label="Nurse"
                />
                <FormControlLabel
                  value="patient"
                  control={<Radio />}
                  label="Patient"
                />
              </RadioGroup>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
export default App;
