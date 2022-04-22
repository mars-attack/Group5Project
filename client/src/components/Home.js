import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/Context";
import homepageImg from './../assets/images/homepage.png';

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

function Home(props) {
  const { auth } = useContext(AuthContext);

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
  useEffect(()=>{
  },[auth.user]);
  return (
 
    <StyledContainer component="main" maxWidth="xl" >
        <Typography
        align='center'
        variant="h3"
        sx={{ marginTop: '30px', color: '#545454'}}
        > {!auth.user ? 'Hospital' : auth.user?.userType === 'nurse' ? 'Nurse' : 'Patient'} System
        <div style={{height: "200px"}}>
          <img  style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto'}} src={homepageImg} alt="homepage"/>
        </div>
        </Typography>
        <Typography
        align='center'
        sx={{ marginTop: '30px', color: '#545454'}}>
          {
            !auth?.user ? 
            <Link to="/login" style={{textAlign: 'center'}}> Please login to access the system.</Link> :  null
          }
        </Typography>
    </StyledContainer>
  );
}

export default withRouter(Home);
