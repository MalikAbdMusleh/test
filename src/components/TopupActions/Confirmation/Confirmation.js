import React, { useState } from "react";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Image from "next/image";

function Confirmation({
  title,
  handelCloseConfirmation,
  auctionDetails,
  dataOffer,
  type,
  inputValue,
}) {
  const router = useRouter();
  return (
    <Box sx={{ top: "12%", left: 8, width: "100%", height: "100%" }}>
      <ArrowBackIosRoundedIcon
        onClick={() => {
          handelCloseConfirmation();
        }}
        sx={{
          cursor: "pointer",
          marginLeft: "2%",
          marginTop: "2%",
          marginBottom: "1%",
          fontSize: 18,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",

          "@media screen and (max-width: 600px)": {
            width: "100%",
          },
          "@media screen and (max-width: 900px)": {
            width: "60%",
          },
        }}
      >
        <CheckCircleOutlineRoundedIcon
          sx={{ width: "53px", height: "57px", color: "#00F0A9" }}
        />
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 400,
            fontStyle: "normal",
            textAlign: "center",
            color: "#00F0A9",
            marginTop: "20px",
          }}
        >
          {type == "offer"
            ? "offer made successfully"
            : "your will notify you if you get outbidded"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 900,
              fontStyle: "normal",
              textAlign: "center",
              color: "GrayText",
              marginTop: "20px",
            }}
          >
            {auctionDetails?.vehiclePrice?.currency?.code}
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 900,
              fontStyle: "normal",
              textAlign: "center",
              color: "black",
              marginTop: "20px",
            }}
          >
            {parseInt(inputValue).toLocaleString()}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 400,
            fontStyle: "normal",
            textAlign: "center",
            color: "GrayText",
            marginTop: "-20px",
          }}
        ></Typography>
        <Box sx={{ height: "300px", position: "relative", width: "100%" }}>
          <Image
            fill
            src={auctionDetails?.mediaPhotos[0].url}
            style={{ objectFit: "cover", borderRadius: "15px" }}
            alt="Image Review order"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 500 }}>
            authion Test 3
          </Typography>
          <Typography sx={{ textTransform: "capitalize" }}>
            lot #{auctionDetails.lot}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          width: "100%",
        }}
      >
        <Button
          onClick={() => router.reload()}
          variant="contained"
          sx={{
            borderRadius: "16px",
            fontSize: "15px",
            width: "366px",
            color: "black",
            fontWeight: 800,
            height: "50px",
          }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}

export default Confirmation;
