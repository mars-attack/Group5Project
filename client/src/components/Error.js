import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export default function App(props) {
  const StyledContainer = styled(Container)`
    height: 500px;
    padding-top: 50px;
    margin-top: 30px;
    background-color: rgb(224 224 224);
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 26%);
    display: float;
    align-items: center;
    justify-content: center;
}
`;
  return (
 
    <StyledContainer component="main" maxWidth="xl" >
        <Typography
        align='center'
        variant="h5"
        sx={{ marginTop: '30px', color: '#545454'}}
        > Opps! Something bad happened, please try again.
        </Typography>
    </StyledContainer>
  );
}