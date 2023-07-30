import AutoBiddingSwitch from "@/components/TopupActions/AutoBidingCheck/AutoBidingCheck";
import CurrentAmount from "@/components/TopupActions/CurrentAmount/CurrentAmount";
import TopupSubmit from "@/components/TopupActions/TopupSubmit/TopupSubmit";
import TopupTag from "@/components/TopupActions/TopupTag/TopupTag";
import TopupTitle from "@/components/TopupActions/TopupTitle/TopupTitle";
import TopupValue from "@/components/TopupActions/TopupValue/TopupValue";
import { checkIfNumber } from "@/lib/helpers";
import { useMakeOfferMutation } from "@/redux/apis/auction-salesApi/buyerApi";
import {
  usePlaceBidMutation,
  usePlaceBidwithAutoBidMutation,
} from "@/redux/apis/bidApi";
import { addOffer } from "@/redux/slices/data.slice";
import { deductBalance } from "@/redux/slices/user.slice";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CustomContainer = ({ children }) => {
  return (
    <Box
      padding={"1% 2% 0 3%"}
      sx={{
        "@media(max-width: 776px)": {
          padding: "1% 10px 0 10px",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default function TopUp({
  type,
  handleTopupSuccess,
  auctionDetails,
  userBalance,
  setDataOffer,
  switchState,
  setSwitchState,
  setInputValue,
  inputValue,
}) {
  const router = useRouter();
  const [action, setAction] = useState("offer");
  const hasMoney = userBalance?.amount >= auctionDetails?.depositAmount?.amount;
  const [hasError, setHasError] = useState(false);
  const [buttonDisabel, setButtonDisabel] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [maxBid, setMaxBid] = useState();
  const [makeOfferQ] = useMakeOfferMutation();
  const [placeBidQ] = usePlaceBidMutation();
  const [placeAutoBidQ] = usePlaceBidwithAutoBidMutation();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error",
  });

  const handleInputChange = (e) => {
    if (e.target.value === "" || checkIfNumber(e.target.value))
      setInputValue(e.target.value);
  };
  const onAutoBidChange = (e) => {
    if (e.target.value === "" || checkIfNumber(e.target.value))
      setMaxBid(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(false);
    if (inputValue.trim() === "") {
      setHasError(true);
      return;
    }
    if (hasMoney) {
      setSubmitted(true);
    } else {
      router.push(
        `/wallet?id=${router.query.id}&amount=${auctionDetails?.depositAmount?.amount}`
      );
    }
  };

  useEffect(() => {
    setSubmitted(hasMoney);
  }, [hasMoney]);

  useEffect(() => {
    setAction(type);
  }, [type]);

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
          handleTopupSuccess();
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
            handleTopupSuccess();
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
            handleTopupSuccess();
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
  // console.log(auctionDetails.depositAmount);
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
      }}
      height={"100%"}
      margin={"auto"}
    >
      <CustomContainer>
        <TopupTitle
          title={auctionDetails.title}
          downPayment={auctionDetails.depositAmount}
          action={action}
        />
      </CustomContainer>
      <Box my={3}>
        {action === "bid" && (
          <TopupTag
            timeRemaining={auctionDetails?.timeRemaining?.secondsLeft}
            action={action}
          />
        )}
      </Box>
      <CustomContainer>
        {auctionDetails?.highestBidPrice && (
          <CurrentAmount
            highestOffer={auctionDetails?.highestBidPrice}
            action={action}
          />
        )}

        <TopupValue
          onChange={handleInputChange}
          hasError={hasError}
          setHasError={setHasError}
          setButtonDisabel={setButtonDisabel}
          value={inputValue}
          action={action}
          snackbarState={snackbarState}
          minimumBid={
            auctionDetails?.saleType === "sale"
              ? auctionDetails?.highestBidPrice?.amount
                ? auctionDetails?.highestBidPrice?.amount +
                  auctionDetails?.minimumBidAmount?.amount
                : auctionDetails?.minimumBidAmount?.amount
              : (auctionDetails?.highestBidPrice?.amount ??
                  auctionDetails?.startingPrice?.amount) +
                auctionDetails?.minimumBidAmount?.amount
          }
        />
        <TextField
          sx={{ display: switchState ? "block" : "none" }}
          fullWidth
          type="number"
          label={`Your maximum bid (Required)`}
          variant="outlined"
          value={maxBid}
          onChange={(e) => {
            e.preventDefault();
            onAutoBidChange(e);
          }}
          InputLabelProps={{
            style: {
              color: "#ffffffe6",
            },
          }}
        />

        {action === "bid" && (
          <AutoBiddingSwitch
            switchState={switchState}
            setSwitchState={setSwitchState}
          />
        )}
      </CustomContainer>
      <TopupSubmit
        buttonDisabel={buttonDisabel}
        depositAmount={auctionDetails?.depositAmount}
        onClick={submitted ? handleTopupSuccess : handleSubmit}
        isSubmitted={hasMoney || submitted}
        action={action}
        minimumBid={auctionDetails?.minimumBidAmount}
      />
      {/* <Snackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState((state) => ({ ...state, open: false }))}
        autoHideDuration={2000}
      >
        <Alert severity={snackbarState.type}>{snackbarState.message}</Alert>
      </Snackbar> */}
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const action = query.action;

  return {
    props: {
      action,
    },
  };
}
