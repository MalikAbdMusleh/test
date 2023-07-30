import React, { useState } from "react";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ReviewOffer from "@/components/TopupActions/ReviewOffer/ReviewOffer";
import Confirmation from "@/components/TopupActions/Confirmation/Confirmation";
import { useMakeOfferMutation } from "@/redux/apis/auction-salesApi/buyerApi";
import {
  usePlaceBidMutation,
  usePlaceBidwithAutoBidMutation,
} from "@/redux/apis/bidApi";

const Congrats = ({
  title,
  type,
  auctionDetails,
  dataOffer,
  handleCloseTopupSuccess,
  switchState,
  inputValue,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const router = useRouter();
  const [makeOfferQ] = useMakeOfferMutation();
  const [placeBidQ] = usePlaceBidMutation();
  const [placeAutoBidQ] = usePlaceBidwithAutoBidMutation();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error",
  });
  const handelopenConfirmation = () => {
    setOpenConfirmation(true);
  };
  const handelCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  // send offer or bid request
  const handleUserConfirmation = () => {
    console.log(type);
    if (type === "offer")
      makeOfferQ({
        auctionVehicleId: auctionDetails.id,
        amount: inputValue,
        currencyCode: auctionDetails.currency.code,
      })
        .unwrap()
        .then((res) => {
          handelopenConfirmation();
        })
        .catch((e) => {
          setSnackbarState((state) => ({
            ...state,
            open: true,
            message: !!e?.data?.payload?.validation?.length
              ? e?.data?.payload?.validation[0]?.errors[0]?.message
              : e.data.message,
          }));
          console.log(!!e?.data?.payload?.validation?.length);
        });
    if (type === "bid") {
      if (!!switchState) {
        placeAutoBidQ({
          auctionVehicleId: auctionDetails.id,
          auctionedPrice: inputValue,
          currencyCode: auctionDetails.currency.code,
          maxBidAmount: maxBid,
        })
          .unwrap()
          .then((res) => {
            handelopenConfirmation();
          })
          .catch((e) => {
            setSnackbarState((state) => ({
              ...state,
              open: true,
              message: !!e?.data?.payload?.validation?.length
                ? e?.data?.payload?.validation[0]?.errors[0]?.message
                : e.message,
            }));
            console.log(e.message);
          });
      } else {
        placeBidQ({
          auctionVehicleId: auctionDetails.id,
          auctionedPrice: inputValue,
        })
          .unwrap()
          .then((res) => {
            handelopenConfirmation();
          })
          .catch((e) => {
            setSnackbarState((state) => ({
              ...state,
              open: true,
              message: !!e?.data?.payload?.validation?.length
                ? e?.data?.payload?.validation[0]?.errors[0]?.message
                : e.message,
            }));
            console.log(e?.data?.payload?.validation[0]?.errors[0]?.message);
          });
      }
    }
    // router.replace(`/congrats?title=${action === 'bid' ? 'Bid' : 'Offer'} added successfully`);
  };
  return (
    <Box sx={{ top: "12%", left: 8, width: "100%", height: "100%" }}>
      {!openConfirmation ? (
        <ReviewOffer
          snackbarState={snackbarState}
          handleCloseTopupSuccess={handleCloseTopupSuccess}
          title={title}
          type={type}
          auctionDetails={auctionDetails}
          handleUserConfirmation={handleUserConfirmation}
          dataOffer={dataOffer}
          inputValue={inputValue}
        />
      ) : (
        <Confirmation
          title={title}
          handelCloseConfirmation={handelCloseConfirmation}
          auctionDetails={auctionDetails}
          dataOffer={dataOffer}
          type={type}
          inputValue={inputValue}
        />
      )}
    </Box>
  );
};

export default Congrats;

export async function getServerSideProps(context) {
  const { query } = context;

  const title = query.title;

  return {
    props: {
      title,
    },
  };
}
