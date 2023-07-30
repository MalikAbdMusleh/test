import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Image from "next/image";
import { Warning } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
function ReviewOffer({
  auctionDetails,
  handleUserConfirmation,
  dataOffer,
  type,
  handleCloseTopupSuccess,
  inputValue,
  snackbarState,
}) {
  //   console.log(dataOffer);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <ArrowBackIosRoundedIcon
        onClick={() => {
          handleCloseTopupSuccess();
        }}
        sx={{
          cursor: "pointer",
          marginLeft: "2%",
          marginTop: "2%",
          marginBottom: "1%",
          fontSize: 18,
        }}
      />
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          fontStyle: "normal",
          textAlign: "center",
          color: "#00F0A9",
        }}
      >
        Review {type}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            fontStyle: "normal",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          {auctionDetails?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <Typography sx={{ textTransform: "capitalize" }}>
            lot #{auctionDetails.lot}
          </Typography>
          |
          <Typography sx={{ textTransform: "capitalize" }}>
            {auctionDetails?.title}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ height: "300px", position: "relative", width: "100%" }}>
        <Image
          fill
          src={auctionDetails?.mediaPhotos[0].url}
          style={{ objectFit: "cover", borderRadius: "15px" }}
          alt="Image Review order"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ textTransform: "capitalize" }}>
          collect for free
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              background: "#121212",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                fontStyle: "normal",
                color: "#fff",
                textTransform: "capitalize",
                padding: "10px",
              }}
            >
              pricing information
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background: "#121212",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                fontStyle: "normal",
                color: "#fff",
                textTransform: "capitalize",
                padding: "10px",
              }}
            >
              you {type}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                fontStyle: "normal",
                color: "#fff",
                textTransform: "uppercase",
                padding: "10px",
              }}
            >
              {auctionDetails?.vehiclePrice?.currency?.code}{" "}
              {parseInt(inputValue).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid item xs={12} container my={2} alignItems={"center"}>
        <Grid item mr={1}>
          <Avatar sx={{ bgcolor: orange[500], width: "30px", height: "30px" }}>
            <Warning sx={{ color: "black", fontSize: "14px" }} />
          </Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={14} textTransform={"capitalize"}>
            note that a 1.5% commission and vat on the commission will be add to
            you final priece when you win the auction
          </Typography>
        </Grid>
      </Grid>
      {snackbarState?.open ? (
        <Typography
          textAlign="center"
          component="p"
          marginTop={1}
          color="#ff1744"
          fontSize={18}
          fontWeight={700}
        >
          {snackbarState.message}
        </Typography>
      ) : (
        ""
      )}
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          onClick={() => {
            handleUserConfirmation();
          }}
          variant="contained"
          sx={{
            borderRadius: "16px",
            fontSize: "15px",
            width: "366px",
            color: "black",
            fontWeight: 800,
            height: "50px",
            textTransform: "capitalize",
          }}
        >
          {type} Now
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewOffer;
