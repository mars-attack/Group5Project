import React, { useEffect, useState } from "react";
import UserDataService from "../../services/UserDataService";
import { useHistory, useLocation } from "react-router-dom";

// MUI
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
import Button from '@mui/material/Button';

// Code example from https://mui.com/components/tables/
export default function PatientList(props) {
  // called once on load
  const [patients, setPatients] = useState([]);
  const history = useHistory();
  useEffect(() => {
    let patientList = [];
    async function fetchData() {
      const res = await UserDataService.getAllPatients();
      if (!res.data.error) {
        patientList = res.data.data;
      }
      setPatients(patientList);
    }
    fetchData();
  }, []);

  const onVitalsButtonClicked = (patient) => {
    // pass data by updating location.state
    history.push("/vitalslist", { patientId: patient._id });
  }

  return (
      <Container component="main" maxWidth="xl">
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
            Patient List
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: "lightgrey", fontweight: 600 }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Vitals</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow
                  key={patient._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        onVitalsButtonClicked(patient);
                      }}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Vitals
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
