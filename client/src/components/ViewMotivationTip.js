import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MotivationDataService from "../services/MotivationDataService";
import YoutubeEmbed from  "./partials/YoutubeEmbed";

//MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function ViewMotivationTip(props) {
  const { id } = useParams();
  const [tip, setTip] = useState({});
  const StyledContainer = styled(Container)`
    height: ${tip.type === "text"? "300px" : "600px"};
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

  useEffect(() => {
    const fetchData = async() => {
      const res = await MotivationDataService.getTipById(id);
      if (res?.data?.data) {
        setTip(res.data.data);
      }
    }
    fetchData();
  }, []);


  return (
    <StyledContainer component="main" maxWidth="xl">
      <Typography align="center" variant="h3" sx={{ color: "#545454" }}>
        Motivational Tip
      </Typography>

      {
        tip?.type === 'video' ?
        <>
          <Typography
            align="center"
            variant="body1"
            sx={{mt:1, mb:1}}>
          <a href={tip.contents} target="_blank" rel="noreferrer">{tip.contents}</a>
          </Typography>
          <YoutubeEmbed embedId={tip.contents.split("=")[1]} />
        </>
         :
        <Typography
          align="center"
          variant="body1"
          sx={{ color: "#545454", textAlign: "center !important" }}
        >
          {tip.contents}
        </Typography>
      }
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        sx={{ mt: 5, mb: 2 }}
        onClick={() => props.history.push("/motivation/list")}
      >
        Back
      </Button>
    </StyledContainer>
  );
}
