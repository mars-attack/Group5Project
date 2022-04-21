
import React, {useState, useEffect} from 'react';
import VitalsDataService from "../services/VitalsDataService";
import AlertDataService from "../services/AlertDataService";
import MLDataService from "../services/MLDataService";
// MUI IMPORTS
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from  '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function App(props) {
    // State Varaibles, Student property will be udated  when student registers
    const [vitals, setVitals] = useState({sex:1, cp:4, exang: 0, fbs: 0});
    const [mode, setMode] = useState('Add');
    const [showToast, setShowToast] = useState({open: false, msg: ""});
    const [patientName, setPatientName] =useState('');
    
    useEffect( () => {
        const { viewMode, editVitals, patientId, patientName } = props.location.state;
        if (!props.location.state) { return }
        if (viewMode && viewMode === 'Edit') {
            setMode(viewMode);
            setVitals(editVitals);
        } else {
            setVitals({...vitals, patient: patientId});
            setPatientName(patientName);
        }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res;
        if (mode === 'Add') {
            res = await VitalsDataService.addVitals(vitals);
        } else {
            res = await VitalsDataService.updateVitals(vitals);
        }

        setShowToast({open: true, msg: res.data.msg});

        // If success
        if (!res.data.error) {

            const predictionsRes = await MLDataService.predictHeartDisease(vitals);
            console.log(predictionsRes.data);
            if(predictionsRes?.data) {
                if (predictionsRes.data>= 0.5) {             
                    await AlertDataService.createAlert(vitals.patient).then(res=> {
                        if (!!res.error) {
                            props.history.push('/error');
                        }
                    })
                } 
                props.history.push('/vitals/result', {prediction: predictionsRes.data});

            } else {
                props.history.push('/error');
            }
        }
    };

    return (
        <Container  component='main' maxWidth='sm'>
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showToast?.open}
            message={showToast?.msg}
            onClose={() => {setShowToast({open: false, msg: ""})}}
            />
            <Box
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component='h1' variant='h5'>
                {`${mode} Vitals For ${patientName}`}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        name='age'
                        type='number'
                        value={vitals.age ?? ''}
                        onChange={(e) => {
                            setVitals({...vitals, age: parseInt(e.target.value)});
                        }}
                        required
                        fullWidth
                        id='age'
                        label='Age'
                        />
                    </Grid>
                    <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            sx={{ ml: 3, mt: 2 }}
                            value={vitals.sex}
                            onChange={(e) => {
                            setVitals({ ...vitals, sex: parseInt(e.target.value) });
                            }}
                                >
                        <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Male"
                        />
                        <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="Female"
                        />
                    </RadioGroup>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id='chest-pain'
                            name='cp'
                            value={vitals.cp}
                            label="Chest Paint Type"
                            select 
                            onChange={(e) => {
                                setVitals({...vitals, cp: parseInt(e.target.value)});
                            }}>
                            <MenuItem value={1}>typical angina</MenuItem>
                            <MenuItem value={2}>atypical angina</MenuItem>
                            <MenuItem value={3}>non-anginal pain</MenuItem>
                            <MenuItem value={4}>asymptomatic</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name='trestbps'
                        type='number'
                        value={vitals.trestbps}
                        onChange={(e) => {
                            setVitals({...vitals, trestbps: parseInt(e.target.value)});
                        }}
                        required
                        fullWidth
                        id='trestbps'
                        label='Blood Pressure'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name='chol'
                        type='number'
                        value={vitals.chol}
                        onChange={(e) => {
                            setVitals({...vitals, chol: parseInt(e.target.value)});
                        }}
                        required
                        fullWidth
                        id='chol'
                        label='Cholesterol'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name='thalach'
                        type='number'
                        value={vitals.thalach}
                        onChange={(e) => {
                            setVitals({...vitals, thalach: parseInt(e.target.value)});
                        }}
                        required
                        fullWidth
                        id='thalach'
                        label='Max Heart Rate'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel id="demo-radio-buttons-group-label">Exercise Induced Angina</FormLabel>
                        <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{ ml: 3, mt: 2 }}
                                value={vitals.exang}
                                onChange={(e) => {
                                    setVitals({ ...vitals, exang: parseInt(e.target.value) });
                                }}
                                    >
                            <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="no"
                            />
                            <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="yes"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel id="demo-radio-buttons-group-label">High Blood Sugar</FormLabel>
                        <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{ ml: 3, mt: 2 }}
                                value={vitals.fbs}
                                onChange={(e) => {
                                    setVitals({ ...vitals, fbs: parseInt(e.target.value) });
                                }}
                                    >
                            <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="no"
                            />
                            <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="yes"
                            />
                        </RadioGroup>
                    </Grid>
        
                </Grid>

                <Grid container spacing={2}>
                    <Button
                        fullWidth
                        type='submit'
                        color='primary'
                        variant='contained'
                        sx={{ml:2, mt: 3, mb: 2 }}
                        >
                        {mode}
                    </Button>
                </Grid>
            </Box>
            </Box>
        </Container >
    )
}
export default App;