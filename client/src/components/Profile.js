import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/Context";
import UserDataService from "../services/UserDataService";
// MUI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

function App(props) {
  const { auth, setAuth } = useContext(AuthContext);

  // State Varaibles
  const [user, setUser] = useState({});
  const [mode, setMode] = useState("view");
  const [showToast, setShowToast] = useState({ open: false, msg: "" });

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    // API Call
    const res = await UserDataService.updateUser(user);
    setShowToast({ open: true, msg: res.data.msg });
    // Navigate if success
    if (res.data.success) {
      setMode("view");
      // Update to new values
      const newData = { ...res.data.data.user };
      localStorage.setItem("user", JSON.stringify(newData));
      setAuth({ user: newData, token: auth.token });
    }
  };

  const capitalizeFirstLetter = (string) => {
    if(!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Container component="main" maxWidth="xs">
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
          {capitalizeFirstLetter(user?.userType)} Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                disabled
              />
            </Grid>
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
                disabled={mode === "view"}
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
                disabled={mode === "view"}
              />
            </Grid>
            {mode !== "view" ? (
                <>
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
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    value={user.newPassword}
                    onChange={(e) => {
                        setUser({ ...user, newPassword: e.target.value });
                    }}
                    />
                </Grid>
                </>
            ) : null}
          </Grid>
          {mode === "view" ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setMode("edit")}
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  xs={12}
                  variant="contained"
                  fullWidth
                  onClick={() => setMode("view")}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Confirm Changes
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}
export default App;
