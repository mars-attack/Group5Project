import React, { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../contexts/Context";
import VitalsDataService from "../services/VitalsDataService";
import UserDataService from "../services/UserDataService";
import { useHistory, useLocation } from "react-router-dom";
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
export default function VitalsList(props) {
  const { auth } = useContext(AuthContext);
  const currentUser = useRef();
  const [vitalsList, setVitalsList] = useState([]);
  const [key, setKey] = useState(0);
  const [showToast, setShowToast] = useState({ open: false, msg: "" });
  const history = useHistory();
  const location = useLocation();
  const [patientIdInternal, setPatientIdInternal] = useState("");
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    // Maintains user on refresh as context will be null
    if (auth.user) {
      currentUser.current= auth.user;
    }
    console.log(currentUser.current);
    // load data
    // If user is a nurse
    if (currentUser.current.userType === "nurse") {
      const { patientId } = location.state;
      if (patientId) {
        setPatientIdInternal(patientId);
        async function fetchData() {
          const patientResult = await UserDataService.getUser(patientId);
          if (!patientResult.data.error) {
            setPatientName(patientResult.data.data.name);
          }
          const res = await VitalsDataService.getAllVitalsByPatient(patientId);
          if (!res.data.error) {
            setVitalsList(res.data.data);
          }
        }
        fetchData();
      }
    } else {
      // If user is a patient
      setPatientName(currentUser.current.name);
      setPatientIdInternal(currentUser.current.id);
      async function fetchData() {
        const res = await VitalsDataService.getAllVitalsByPatient(currentUser.current.id);
        if (!res.data.error) {
          setVitalsList(res.data.data);
        }
      }
      fetchData();
    }
  }, [key]);

  const editVitals = async (vitalsToEdit) => {
    props.history.push();
    // pass data by updating location.state
    props.history.push("/vitals/form", {
      viewMode: "Edit",
      editVitals: vitalsToEdit,
    });
  };

  const deleteVitals = async (vitals) => {
    const res = await VitalsDataService.deleteVitals(vitals._id);
    setShowToast({ open: true, msg: res.data.msg });
    if (!res.data.error) {
      setKey(Date.now());
    }
  };

  // Helper function to display the chest pain type
  const getChestPainType = (num) => {
    switch (num) {
      case 1:
        return "Typical Angina";
      case 2:
        return "Atypical Angina";
      case 3:
        return "Non-Anginal Pain";
      case 4:
        return "Asymptomatic";
      default:
        return "";
    }
  }

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
          {patientName}'s Vitals History
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          history.push("/vitals/form", {
            mode: "Add",
            patientId: patientIdInternal,
            patientName: patientName,
          });
        }}
        sx={{ mt: 3, mb: 2 }}
      >
        Add Vitals
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "lightgrey", fontweight: 600 }}>
              <TableCell>Date</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Chest Pain Type</TableCell>
              <TableCell>Bood Pressure</TableCell>
              <TableCell>Cholesterol</TableCell>
              <TableCell>High Blood Sugar</TableCell>
              <TableCell>Max Heart Rate</TableCell>
              <TableCell>Exercise Induced Angina</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vitalsList.map((vitals) => (
              <TableRow
                key={vitals._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{new Date(vitals.date).toLocaleString()}</TableCell>
                <TableCell>{vitals.age}</TableCell>
                <TableCell>{vitals.sex ? 'Male' : 'Female'}</TableCell>
                <TableCell>{getChestPainType(vitals.cp)}</TableCell>
                <TableCell>{vitals.trestbps}</TableCell>
                <TableCell>{vitals.chol}</TableCell>
                <TableCell>{vitals.fbs  ? 'Yes' : 'No'}</TableCell>
                <TableCell>{vitals.thalach}</TableCell>
                <TableCell>{vitals.exang ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      editVitals(vitals);
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
                    onClick={() => {
                      deleteVitals(vitals);
                    }}
                    sx={{ mt: 3, mb: 2 }}
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
