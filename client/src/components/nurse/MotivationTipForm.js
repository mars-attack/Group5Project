import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/Context";
import MotivationDataService from "../../services/MotivationDataService";

// MUI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import TextareaAutosize from "@mui/material/TextareaAutosize";


function App(props) {
  // State Varaibles, Student property will be udated  when student registers
  const [tip, setTip] = useState({ type: '', content: ''});
  const [mode, setMode] = useState("Add");
  const [showToast, setShowToast] = useState({ open: false, msg: "" });
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const { viewMode, tipId } = props.location.state;
    if (!props.location.state) {
      return;
    }
    if (viewMode && viewMode === "Edit") {
      setMode(viewMode);
      // Get tip
      const fetchData = async () => {
        const res = await MotivationDataService.getTipById(tipId);

        if (res?.data?.data) {
          setTip(res.data.data);
        }
      };
      fetchData();
    } else {
      setTip({ ...tip, nurse: auth.user.id });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res;
    if (mode === "Add") {
      res = await MotivationDataService.addTip(tip);
    } else {
      res = await MotivationDataService.editTip(tip);
    }

    setShowToast({ open: true, msg: res.data.msg });

    // If success
    if (!res.data.error) {
      props.history.push("/motivation/list");
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
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
          {`${mode} Motivational Tip`}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 , width: '100%'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="content-type"
                name="content-type"
                value={tip.type}
                label="Content Type"
                select
                onChange={(e) => {
                  setTip({ ...tip, type: e.target.value });
                }}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"video"}>YouTube Video</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Text or YouTube Link"
                name="contents"
                value={tip.contents}
                onChange={(e) => {
                  setTip({ ...tip, contents: e.target.value });
                }}
                required
                fullWidth
                id="contents"
                label="Contents"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{ ml: 2, mt: 3, mb: 2 }}
            >
              {mode}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default App;
