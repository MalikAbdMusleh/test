import * as React from "react";
import {
  Box,
  Button,
  TextField,

} from "@mui/material";

import { useState } from "react";
import Typography from "@mui/material/Typography";

import {
  useAcceptSpecificOfferMutation,
  useCounterOfferMutation,
  useDeclineOfferMutation,
  useGetUserOffersQuery,
} from "@/redux/apis/auction-salesApi/sellerApi";
import SliderBlock from "@/widgets/SliderBlock/SliderBlock";


export default function OfferCard({ el }) {
  const [offerAmount, setOfferAmount] = useState(el?.counterOfferAmount?.amount);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error",
  });
  
  const [counterOfferQ] = useCounterOfferMutation();

 


  const [counterOfferActive, setCounterOfferActive] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState("");

  const toggleCounterOffer = () => setCounterOfferActive((state) => !state);
  const handleCounterOffer = (id, amount) => {
    setCounterOfferAmount(amount)
    counterOfferQ({ id, amount: amount })
      .unwrap()
      .then((res) => {
        setSnackbarState((state) => ({
          type: "success",
          open: true,
          message: "Counter Offer Made Successfully!",
        }));
        toggleCounterOffer();
        location.reload()

      })
      .catch((e) => {
        setSnackbarState((state) => ({
          type: "error",
          open: true,
          message: e.data.payload.validation[0].errors[0].message,
        }));
      });
  };
  
  const [acceptOfferQ] = useAcceptSpecificOfferMutation();

  const handleAcceptSpecificOffer = (id) => {
    acceptOfferQ({ auctionVehicleSaleOfferId: id })
      .unwrap()
      .then((res) => {
        setSnackbarState((state) => ({
          type: "success",
          open: true,
          message: "Offer Accepted Successfully!",
        }));
        location.reload()

      })
      .catch((e) => {
        setSnackbarState((state) => ({
          type: "error",
          open: true,
          message: e.message || e.data.payload.validation[0].errors[0].message,
        }));
      });
  };
  const [declineOfferQ] = useDeclineOfferMutation();


  const handleDeclineOffer = (id) => {
    declineOfferQ({ auctionVehicleSaleOfferId: id })
      .unwrap()
      .then((res) => {
        setSnackbarState((state) => ({
          type: "success",
          open: true,
          message: "Declined Successfully!",
        }));
        location.reload()

      })
      .catch((e) => {
        setSnackbarState((state) => ({
          type: "error",
          open: true,
          message: e.data.payload.validation[0].errors[0].message,
        }));
      });
  };
  return (
    <Box
    
    sx={{ padding: 2, borderRadius: 3, background: "rgb(35, 35, 35)" }}
  >
    <Typography>
      Auction ID: &nbsp;
      <Typography sx={{ display: "inline-block" }} fontWeight={600}>
        {el.auctionVehicleId}
      </Typography>
    </Typography>
    <Typography>
      Offer Amount: &nbsp;
      <Typography sx={{ display: "inline-block" }} fontWeight={600}>
        {el.amount.currency.code} {el.amount.amount}
      </Typography>
    </Typography>

    {el.state === "counter-offer" && (
      <Typography>
        Counter Offer: &nbsp;
        <Typography sx={{ display: "inline-block" }} fontWeight={600}>
          {el.counterOfferAmount.currency.code}{" "}
          {offerAmount}
        </Typography>
      </Typography>
    )}
    <Box>
      <Button onClick={() => handleAcceptSpecificOffer(el.id)}>
        Accept
      </Button>
      <Button onClick={() => handleDeclineOffer(el.id)}>Decline</Button>
      <Button onClick={toggleCounterOffer}>Counter</Button>
    </Box>
    {counterOfferActive && (
      <Box>
        <TextField
          value={counterOfferAmount}
          type="number"
          onChange={(e) => setCounterOfferAmount(e.target.value)}
          label="counter offer amount"
        />
        <Button
          onClick={() => handleCounterOffer(el.id, counterOfferAmount)}
        >
          Send Offer
        </Button>
        <Button onClick={toggleCounterOffer}>Cancel</Button>
      </Box>
    )}
  </Box>
  );
}
