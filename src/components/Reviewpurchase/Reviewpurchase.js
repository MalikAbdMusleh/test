import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Dialog } from "@mui/material";
import Image from "next/image";
import { Warning } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useBuyNowPreviewMutation } from "@/redux/apis/auction-salesApi/buynowApi";
import { useRouter } from "next/router";
function Reviewpurchase({
  auctionDetails,
  handleUserConfirmation,
  type,
  handleCloseTopupSuccess,
  snackbarState,
  checkoutSuccess,
}) {
  const router = useRouter();
  const [addressOption, setAddressOption] = useState();
  const [addresses, setAddresses] = useState([]);
  const [pricingData, setPricingData] = useState([]);
  const [openDialog, setOpenDialog] = useState(snackbarState);

  const mapPricingData = (apiResponse) => {
    setPricingData((state) => [
      {
        id: 0,
        label: "Item Price",
        cost: `${apiResponse["currencyCode"]} ${apiResponse["vehiclePrice"].amount}`,
      },
      {
        id: 1,
        label: "Mazadak Fee",
        cost: `${apiResponse["currencyCode"]} ${apiResponse["commission"].amount}`,
      },
      {
        id: 2,
        label: "VAT",
        cost: `${apiResponse["currencyCode"]} ${apiResponse["vat"].amount}`,
      },
      // {
      //   id: 3,
      //   label: "Delivery Fee",
      //   value: "deliveryFee",
      //   cost:
      //     addressOption === "pickup"
      //       ? "----"
      //       : `${apiResponse["currencyCode"]} ${apiResponse["deliveryFee"].amount}`,
      // },
      {
        id: 3,
        label: "Deposit",
        cost: `${apiResponse["currencyCode"]} ${apiResponse["deposit"].amount}`,
      },
      {
        id: 4,
        label: "Total Price",
        cost: `${apiResponse["currencyCode"]} ${apiResponse["totalPrice"].amount}`,
      },
    ]);
  };
  const [buyNowPreviewQ, buyNowPreviewRes] = useBuyNowPreviewMutation();
  useEffect(() => {
    // const requestBody = addressOption
    //   ? {
    //       delivery: {
    //         capacity: 1,
    //         coordinates: {
    //           latitude: lat,
    //           longitude: lng,
    //         },
    //       },
    //     }
    //   : {};
    buyNowPreviewQ({
      // body: requestBody,
      body: {},
      params: `auctionVehicleId=${router.query.id}`,
    })
      .unwrap()
      .then((res) => {
        mapPricingData(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
    <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "column", gap: "10px", background: "#fff", padding: "10px" }}>
      <Typography sx={{ fontSize: "18px", fontStyle: "normal"}} padding={"15px"} style={{ color: "black"}}>
        Complete the payment in 3 minutes from now
      </Typography>
      <Button 
        variant="contained"
        sx={{
          width: "20%",
          height: "50px",
          marginTop: "10px",
          marginBottom: "10px",
          background: "#fff",
          borderRadius: "10px",
          border: "1px solid #00F0A9",
          fontSize: "18px",
          fontWeight: 500,
          fontStyle: "normal",
          color: "#00F0A9",
        }}
        onClick={() => {
          setOpenDialog(false);
        }}
      >
        Ok
      </Button>
      </Box>
    </Dialog>
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
        Review Purchase
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 500,
                    fontStyle: "normal",
                    color: "#fff",
                    textTransform: "capitalize",
                  }}
                >
                  pricing information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  item
                  container
                  width="100%"
                  marginTop={3}
                  direction="column"
                  alignItems="center"
                  // bgcolor={ "#232323"}
                  border={"2px solid #232323"}
                  borderRadius={4}
                >
                  {pricingData.map((data, i) => (
                    <Grid
                      key={data.id}
                      item
                      p={2}
                      my={1}
                      container
                      justifyContent="space-between"
                      borderTop={
                        i === pricingData.length - 1 ? "1px solid" : "none"
                      }
                    >
                      <Grid item md={12} lg={6}>
                        <Typography
                          variant="body1"
                          fontWeight={data.label === "Total Price" ? 900 : 700}
                          color="inherit"
                        >
                          {data.label}
                        </Typography>
                      </Grid>
                      <Grid item md={12} lg={6}>
                        <Typography
                          variant="body1"
                          fontWeight={data.label === "Total Price" ? 900 : 500}
                        >
                          {data?.cost || "---"}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
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
              total price
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
              {pricingData[pricingData.length - 1]?.cost || "---"}
            </Typography>
          </Box>
        </Box>
      </Box>
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
            checkoutSuccess();
            router.push(`/checkout?id=${auctionDetails?.id}`);
            checkoutSuccess();
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
          Checkout Now
        </Button>
      </Box>
    </Box>
    </>
  );
}

export default Reviewpurchase;
