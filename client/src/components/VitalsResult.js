import React, {useContext } from "react";
import AuthContext from "../contexts/Context";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import WarningIcon from "@material-ui/icons/Warning";
import FavoriteIcon from '@material-ui/icons/Favorite';

const alertLimit = 0.5;
export default function App(props) {
  const { prediction } = props.location.state;
  const { auth, setAuth } = useContext(AuthContext);
  const StyledContainer = styled(Container)`
    height: 450px;
    width: 600px;
    padding-top: 50px;
    margin-top: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 26%);
    display: float;
    align-items: center;
    justify-content: center;
}
`;
  const handleButtonClicked = ()  => {
    props.history.push("/alertlist");
  }
  return (
    <StyledContainer component="main" maxWidth="xl">
      <Typography align="center" variant="h3" sx={{ mt: 4, color: "#545454" }}>
        Vitals Results
      </Typography>
      {prediction >= alertLimit ? (
        <Typography align="center" variant="h1" sx={{ mt: 1, color: "orange" }}>
          <WarningIcon style={{fontSize: "4.5rem"}} />
        </Typography>
      ) :         <Typography align="center" variant="h1" sx={{ mt: 1, color: "green" }}>
      <FavoriteIcon style={{fontSize: "4.5rem"}} />
    </Typography>}
      <Typography
        align="center"
        variant="body1"
        sx={{ color: "#545454", textAlign: "center !important" }}
      >
        {prediction.toFixed(3)} Chance of heart disease detected. <br />
        <b>
          {prediction >= alertLimit
            ? "Risk of heart disease is high! Patient alert created."
            : "Patient is in good health"}
        </b>
      </Typography>
      {(prediction >= alertLimit && auth.user.userType === 'nurse') && (
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: 5, mb: 2 }}
          onClick={()=> handleButtonClicked()}
        >
          View Alerts
        </Button>
      )}
    </StyledContainer>
  );
}
