import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/Context";
import MotivationDataService from "../services/MotivationDataService";
import UserDataService from "../services/UserDataService";
import { useHistory } from "react-router-dom";
// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

// Code example from https://mui.com/components/tables/
export default function MotivationTipList(props) {
  const { auth } = useContext(AuthContext);
  const [tipList, setTipList] = useState([]);
  const [user, setUser] = useState({});
  const [key, setKey] = useState(0);
  const [showToast, setShowToast] = useState({ open: false, msg: "" });
  const history = useHistory();

  // load data
  useEffect(() => {
    // get user from auth context
    if (auth.user) {
      setUser(auth.user);
    }
    async function fetchData() {
      const res = await MotivationDataService.getAll(user._id);

      if (!res.data.error) {
        let tips = res.data.data;

        const getExtraData = async () => {
          return Promise.all(
            tips.map(async (tip) => ({
              ...tip,
              nurseName: (await getUserName(tip.nurse)) ?? "",
            }))
          );
        };
        getExtraData().then((data) => {
          setTipList(data);
        });
      }
    }
    fetchData();
  }, [key, auth.user]);

  const editMotivation = async (tip) => {
    // pass data by updating location.state
    props.history.push("/motivation/form", {
      viewMode: "Edit",
      tipId: tip._id
    });
  };

  const viewMotivation = async (tip) => {
    // pass data by updating location.state
    props.history.push(`/motivation/view/${tip._id}`);
  };

  const deleteMotivation = async (tip) => {
    const res = await MotivationDataService.deleteMotivation(tip._id);
    setShowToast({ open: true, msg: res.data.msg });
    if (!res.data.error) {
      setKey(Date.now());
    }
  };

  // helper function to get nurse name for motivational tips
  const getUserName = async (id) => {
    if (!id) {
      return;
    }
    const res = await UserDataService.getUser(id);
    return res.data?.data.name;
  };

  return (
    <Container component="main" maxWidth="xl">
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
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Motivational Tips
        </Typography>
      </Box>
        {
          user?.userType === 'nurse' &&
          <Button
            variant="contained"
            onClick={() => {
              history.push("/motivation/form", { mode: "Add" });
            }}
            sx={{ mt: 3, mb: 2 }}
          >
            Add Tip
          </Button>
        }

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "lightgrey", fontweight: 600 }}>
              <TableCell>Date</TableCell>
              <TableCell>Nurse</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>View</TableCell>
              {user?.userType === "nurse" && (
                <>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tipList.map((tip) => (
              <TableRow
                key={tip._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{new Date(tip.date).toLocaleString()}</TableCell>
                <TableCell>{tip.nurseName}</TableCell>
                <TableCell>{tip.type}</TableCell>
                <TableCell>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => {
                      viewMotivation(tip);
                    }}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    View
                  </Button>
                </TableCell>
                {user?.userType === "nurse" && (
                  <>
                    <TableCell>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          editMotivation(tip);
                        }}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteMotivation(tip);
                        }}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
