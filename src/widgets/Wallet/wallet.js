import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import { wrapper } from "@/redux/store";
import {
  getRunningQueriesThunk,
  getWithdrawWallet,
  useGetMinimumDepositAmountQuery,
  useGetWithdrawWalletQuery,
  requestWithdraw,
  useRequestWithdrawMutation,
  getProfileAmount,
  getMinimumDepositAmount,
  useGetProfileAmountQuery,
} from "@/redux/apis/walletApi";
import Link from "next/link";
import { useRouter } from "next/router";
import BankTransfer from "../BankTransfer/BankTransfer";
import CustomDialog from "@/components/CustomDialog/CustomDialog";

const Wallet = () => {
  const [isOpened, setIsOpend] = useState(false);
  const [message, setAlert] = useState(false);

  const [openPricingOptions, setOpenPricingOptions] = useState(false);

  const [widthdrawWalletAmount, setAmout] = useState([]);
  const [minimumDepositAmount, setMinimumDepositAmout] = useState([]);
  const [requestWithdraw, requestRes] = useRequestWithdrawMutation();
  const wallletQuery = useGetWithdrawWalletQuery();
  const minimumDeposit = useGetMinimumDepositAmountQuery();
  const profileDetails = useGetProfileAmountQuery();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (wallletQuery?.isSuccess) {
      setAmout(wallletQuery?.data);
    }
  }, [wallletQuery]);

  useEffect(() => {
    if (minimumDeposit?.isSuccess) {
      setMinimumDepositAmout(JSON.parse(minimumDeposit?.data?.data));
    }
  }, [minimumDeposit]);

  useEffect(() => {
    if (requestRes?.isError) {
      const errorMessage = Object.values(requestRes?.error?.data || {})
        .flatMap((ele) => ele)
        .flatMap((ele) => ele?.errors || [])
        .map((ele) => ele?.message)
        .join(",");

      setAlert(errorMessage);
    } else if (requestRes?.isSuccess) {
      setAlert("Success");
    }
    // setAlerError(requestRes?.isError);
  }, [requestRes]);

  const onClickWallet = () => {
    if (openPricingOptions) {
      setOpenPricingOptions(false);
    } else {
      setIsOpend((pre) => !pre);
    }
  };

  const onTopUp = (bool) => {
    setOpenPricingOptions(bool);
  };

  const router = useRouter();
  const onRequestWithdraw = () => {
    router.push("/withdraw");
    // requestWithdraw({
    //   amount: profileDetails?.data?.deposit?.amount,
    //   currencyCode: profileDetails?.data?.currency?.code,
    //   iban: profileDetails?.data?.favouriteBank?.iban,
    //   name: profileDetails?.data?.favouriteBank?.name,
    //   mobile: profileDetails?.data?.mobile,
    // });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(null);
  };

  return (
    <>
      {message && (
        <Snackbar
          open={message ? true : false}
          autoHideDuration={1100}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={requestRes?.isError ? "error" : "success"}
            sx={{ width: "100%", color: "white" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      <Box
        onClick={onClickWallet}
        sx={{
          borderRadius: "12px 12px 0 0",
          borderTop: "2px solid #00F0A9",
          cursor: "pointer",
        }}
      >
        <Stack pb={4}>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              mt={3}
              sx={{
                border: "4px solid rgba(255, 255, 255, 0.7)",
                width: "10%",
                borderRadius: "20px",
              }}
            ></Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            px={3}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={700} fontSize={16}>
              {" "}
              My Wallet
            </Typography>

            <Image
              src="/imgs/question-filled.svg"
              width={30}
              height={30}
            ></Image>
          </Box>

          <Box m={3}>
            <Divider
              sx={{
                height: "2px",
                borderRadius: "20px",
                backgroundColor: "#FFFFFF",
              }}
            />
          </Box>
        </Stack>

        {isOpened && (
          <Stack
            // onClick={}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack
              sx={{
                width: "50%",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack>
                <Typography color="primary" fontSize={16} fontWeight={600}>
                  Your current balance is
                </Typography>
                <Typography
                  color="primary"
                  textAlign={"center"}
                  p={1}
                  fontSize={20}
                  fontWeight={800}
                >
                  {profileDetails?.data?.deposit?.amount
                    ? profileDetails?.data?.deposit?.amount
                    : "0"}
                  &nbsp;
                  {profileDetails?.data?.deposit?.currency?.code
                    ? profileDetails?.data?.deposit?.currency?.code
                    : ""}
                </Typography>
              </Stack>
              <Stack py={2}>
                <Typography color={"#D9D9D9"}>
                  The down payment for a bid is{" "}
                  {(minimumDepositAmount?.depositAmount?.amount.toLocaleString() ?? 0) +
                    " " +
                    (minimumDepositAmount?.depositAmount?.currency?.code ?? "")}
                </Typography>
              </Stack>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Stack
                    display={"flex"}
                    alignItems={"center"}
                    px={3}
                    justifyContent={"center"}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onTopUp(true);
                      }}
                      sx={{
                        backgroundColor: "#00F0A9",
                        width: "fit-content",
                        margin: ".5rem 0rem",
                      }}
                    >
                      <AddIcon fontSize="large" />
                    </IconButton>
                    <Typography
                      color={"primary"}
                      fontSize={14}
                      fontWeight={600}
                    >
                      Top up
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack
                    display={"flex"}
                    alignItems={"center"}
                    px={3}
                    justifyContent={"center"}
                  >
                    <IconButton
                      disabled={
                        profileDetails?.data?.deposit?.amount === 0 &&
                        widthdrawWalletAmount?.length !== 0
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestWithdraw();
                      }}
                      sx={{
                        "&.Mui-disabled": {
                          backgroundColor: "#4A4A4A",
                          cursor: " not-allowed",
                          pointerEvents: "all",
                        },

                        backgroundColor: "#4A4A4A",
                        width: "fit-content",
                        margin: ".5rem 0rem",
                      }}
                    >
                      <RemoveIcon fontSize="large" color="#4A4A4A" />
                    </IconButton>{" "}
                    <Typography
                      color={"#4A4A4A"}
                      fontSize={14}
                      fontWeight={600}
                    >
                      Widthdraw
                    </Typography>
                  </Stack>{" "}
                </Grid>
                {/* <Stack>
                <IconButton sx={{ backgroundColor: "#00F0A9" }}>
                  <AddIcon fontSize="large" />
                </IconButton>
                <Typography color={"primary"}>Top up</Typography>
              </Stack>

              <Stack>
                <IconButton sx={{ backgroundColor: "#00F0A9" }}>
                  <RemoveIcon fontSize="large" />
                </IconButton>{" "}
              </Stack> */}
              </Grid>{" "}
            </Stack>
          </Stack>
        )}
      </Box>

      {openPricingOptions && (
        <Box>
          <Grid
            p={2}
            py={3}
            bottom={openPricingOptions ? 0 : -500}
            container
            position="absolute"
            bgcolor="#000"
            borderRadius="12px 12px 0px 0px"
            sx={{
              transition: "all 0.5s ease-out",
              width: { xs: "100%", lg: "100%" },
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              bottom: 150,
              textAlign: "center",
            }}
          >
            <Grid item width="100%" mb={2} container justifyContent="center">
              <Link
                href={{
                  pathname: "/price-payment",
                  query: { paymentComplete: "true" },
                }}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ maxHeight: 58, width: "100%" }}
                >
                  <Grid
                    container
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <img src="/imgs/payment-methods/mastercard.svg" />
                    <img src="/imgs/payment-methods/visa.svg" />
                    <img src="/imgs/payment-methods/mada.svg" />
                  </Grid>
                </Button>
              </Link>
            </Grid>
            <Grid item width="100%" mb={2} container justifyContent="center">
              <Link
                href={{
                  pathname: "/price-payment",
                  query: { paymentComplete: "true" },
                }}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  textAlign="center"
                  sx={{ maxHeight: 58, width: "100%" }}
                >
                  <img src="/imgs/payment-methods/stcpay.svg" />
                </Button>
              </Link>
            </Grid>
            <Grid item width="100%" mb={2} container justifyContent="center">
              {/* <Link
                href={{
                  pathname: "/topUp",
                  query: { paymentComplete: "true" },
                }}
                style={{ width: "100%", textAlign: "center" }}
              > */}
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ maxHeight: 58, width: "100%" }}
                  onClick={() => setOpenDialog(true)}
                >
                  Bank Transfer
                </Button>
                <CustomDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title={"Bank Transfer"}
                component={
                  <BankTransfer />
                }
              />
              {/* </Link> */}
            </Grid>
            <Grid item width="100%" container justifyContent="center">
              <Link
                href={{
                  pathname: "/price-payment",
                  query: { paymentComplete: "true" },
                }}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Button
                  variant="filled"
                  sx={{
                    maxHeight: 58,
                    bgcolor: "#fff",
                    width: "100%",
                    "&:hover": {
                      bgcolor: "#fff",
                    },
                  }}
                >
                  <img src="/imgs/payment-methods/applepay.svg" />
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Wallet;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getWithdrawWallet.initiate());
    store.dispatch(getProfileAmount.initiate());
    store.dispatch(getMinimumDepositAmount.initiate());
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
