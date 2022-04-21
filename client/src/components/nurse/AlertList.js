import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../contexts/Context";
import AlertDataService from "../../services/AlertDataService";
import UserDataService from "../../services/UserDataService";
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
export default function AlertList(props) {
  const [alertList, setAlertList] = useState([]);
  const [key, setKey] = useState(0);
  const [showToast, setShowToast] = useState({ open: false, msg: "" });
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(auth.user);

  // load data
  useEffect(() => {
    // get user from auth context
    if (auth.user) {
      setUser(auth.user);
    }

    async function fetchData() {
      const res = await AlertDataService.getAllAlerts();

      if (!res.data.error) {
        let alerts = res.data.data;

        const getExtraData = async () => {
          return Promise.all(
            alerts.map(async (alert) => ({
              ...alert,
              patientName: (await getUserName(alert.patient)) ?? "",
              nurseName: (await getUserName(alert.checkedBy)) ?? "",
            }))
          );
        };
        getExtraData().then((data) => {
          setAlertList(data);
        });
      }
    }
    fetchData();
  }, [key, auth.user]);

  const checkPatient = async (alert) => {
    const res = await AlertDataService.checkPatient(alert._id, user.id);
    setShowToast({ open: true, msg: res.data.msg });
    if (!res.data.error) {
      setKey(Date.now());
    }
  };
  const deleteAlert = async (alert) => {
    const res = await AlertDataService.deleteAlert(alert._id);
    setShowToast({ open: true, msg: res.data.msg });
    if (!res.data.error) {
      setKey(Date.now());
    }
  };

  const getUserName = async (id) => {
    if (!id) {
      return;
    }
    const res = await UserDataService.getUser(id);
    return res.data?.data?.name;
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
          Alert List
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "lightgrey", fontweight: 600 }}>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Attended To</TableCell>
              <TableCell>Date Attended To</TableCell>
              <TableCell>Attended By</TableCell>
              <TableCell>Check Patient</TableCell>
              <TableCell>Delete Alert</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertList.map((alert) => (
              <TableRow
                key={alert._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{alert.patientName}</TableCell>
                <TableCell>
                  {alert.dateCreated
                    ? new Date(alert.dateCreated).toLocaleString()
                    : ""}
                </TableCell>
                <TableCell>{alert.isChecked ? "true" : "false"}</TableCell>
                <TableCell>
                  {alert.dateChecked
                    ? new Date(alert.dateChecked).toLocaleString()
                    : ""}
                </TableCell>
                <TableCell>{alert.nurseName ?? ""}</TableCell>

                <TableCell>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      checkPatient(alert);
                    }}
                    sx={{ mt: 3, mb: 2 }}
                    disabled={alert.isChecked}
                  >
                    Check
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteAlert(alert);
                    }}
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!alert.isChecked}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
