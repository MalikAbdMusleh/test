import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import BankTransfer from "@/widgets/BankTransfer/BankTransfer";
import Withdraw from "@/widgets/Withdraw/Withdraw";
import Price from "../price-payment";
import { useEffect } from "react";
import { useGetProfileQuery } from "@/redux/apis/profile.api";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const WalletNew = () => {
  const router = useRouter();
  const [mode, setMode] = useState("init");
  const selectRef = useRef(null);
  const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true });
  const [initStyles, setInitStyles] = useState({ xs: 0, md: 12 });
  const [selectedMethod, setSelectedMethod] = useState();
  const onTopUp = () => {
    setMode("select");
    selectRef.current?.scrollIntoView({ block: "end" });
  };
  const onRequestWithdraw = () => {
    setInitStyles(12);
    setMode("withdraw");
    selectRef.current?.scrollIntoView({ block: "end" });
  };
  const handleFinishWithdraw = () => {
    setInitStyles(0);
    setMode("init");
  };
  const handleTopup = (method) => {
    setSelectedMethod(method);
    setMode("topup");
  };
  const handleTopupSuccess = () => {
    if (router?.query?.id) router.push(`/lot-details/${router.query.id}`);
    else router.push("/profile");
  };

  const reroute =
    !!router.query.id &&
    Number(router?.query?.amount) <= Number(data?.deposit?.amount);

  useEffect(() => {
    selectRef.current?.scrollIntoView({ block: "end" });
  }, []);

  useEffect(() => {
    if (reroute) router.push(`/lot-details/${router.query.id}`);
  }, [data]);
  return (
   <>
      <ArrowBackIosRoundedIcon
        onClick={() => router.back()}
        sx={{
          cursor: "pointer",
          marginLeft: "2%",
          marginTop: "2%",
          marginBottom: "1%",
          fontSize: 18,
        }}
      />
    <Grid
      container
      width={{ lg: "70vw" }}
      margin={{ lg: "auto" }}
      style={{ marginTop: 25 }}
      alignItems={"center"}
      sx={{ background: "#262626", borderRadius: 4 }}
    >
      <Grid item xs={12} md={6} mb={{ xs: 10 }} mt={12}>
        <Grid
          container
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography
              color="primary"
              fontSize={28}
              fontWeight={600}
              textAlign={"center"}
            >
              Your current balance is
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              rowSpacing={1}
              columnGap={2}
              p={1}
            >
              <Typography fontSize={25} color={"grey"}>
                {data?.deposit?.currency?.code}
              </Typography>
              <Typography fontSize={25} fontWeight={700}>
                {data?.deposit?.amount.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          {router?.query?.amount &&
            router?.query?.amount > data?.deposit?.amount && (
              <>
                <Grid item py={2}>
                  <Typography color={"#D9D9D9"} textAlign={"center"}>
                    The down payment for a bid is
                    <Typography fontWeight={700} fontSize={19}>
                      {router?.query?.amount.toLocaleString()}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item py={1} sx={{ width: { xs: "100%", lg: "70%" } }}>
                  <Typography
                    color={"#ff0000bd"}
                    fontSize={14}
                    textAlign={"center"}
                  >
                    You don{"'"}t have enough money in your wallet. you must
                    have the amount mentioned above.
                  </Typography>
                </Grid>
              </>
            )}
          <Grid item my={3}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6}>
                <Stack
                  display={"flex"}
                  alignItems={"center"}
                  px={3}
                  justifyContent={"center"}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onTopUp();
                    }}
                    sx={{
                      backgroundColor: "#00F0A9",
                      width: "fit-content",
                      margin: ".5rem 0rem",
                    }}
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                  <Typography color={"primary"} fontSize={14} fontWeight={600}>
                    Top up
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  display={"flex"}
                  alignItems={"center"}
                  px={3}
                  justifyContent={"center"}
                >
                  <IconButton
                    disabled={false}
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
                  </IconButton>
                  <Typography color={"#4A4A4A"} fontSize={14} fontWeight={600}>
                    Widthdraw
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={initStyles}
        md={6}
        sx={{
          background: "radial-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .9));",
          borderRadius: "0 12px 12px 0",
          height: { xs: "auto", sm: "100vh" },
        }}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        ref={selectRef}
        width={"100%"}
      >
        {mode === "select" && (
          <Grid
            container
            borderRadius="12px 12px 0px 0px"
            sx={{ transition: "all 1s ease-out" }}
            justifyContent={"center"}
            p={4}
            width={"100%"}
          >
            <Grid item xs={12} mb={2} justifyContent="center">
              <Button
                variant="filled"
                sx={{
                  maxHeight: 80,
                  bgcolor: "#fff",
                  width: "100%",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                  height: "65px",
                }}
                onClick={() => handleTopup("card")}
              >
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems={"center"}
                  height={"100%"}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{ height: "55%", position: "relative" }}
                  >
                    <Image
                      style={{ objectFit: "contain" }}
                      fill
                      src="/imgs/paymentIcons/mc.svg"
                      alt="master card"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{ height: "55%", position: "relative" }}
                  >
                    <Image
                      style={{ objectFit: "contain" }}
                      fill
                      src="/imgs/paymentIcons/visa.svg"
                      alt="visa"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{ height: "50%", position: "relative" }}
                  >
                    <Image
                      style={{ objectFit: "contain" }}
                      fill
                      src="/imgs/paymentIcons/mada.svg"
                      alt="mada"
                    />
                  </Grid>
                </Grid>
              </Button>
            </Grid>
            <Grid item xs={12} mb={2} container justifyContent="center">
              <Button
                variant="filled"
                sx={{
                  maxHeight: 80,
                  bgcolor: "#fff",
                  width: "100%",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                  height: "65px",
                }}
                onClick={() => handleTopup("stc")}
              >
                <Grid item xs={3} sx={{ height: "70%", position: "relative" }}>
                  <Image
                    style={{ objectFit: "contain" }}
                    fill
                    src="/imgs/paymentIcons/stc.svg"
                    alt="stc"
                  />
                </Grid>
              </Button>
            </Grid>
            <Grid item xs={12} mb={2} container justifyContent="center">
              <Button
                variant="filled"
                sx={{
                  height: 70,
                  bgcolor: "#fff",
                  width: "100%",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                  color: "black",
                  height: "65px",
                }}
                onClick={() => setMode("bank")}
              >
                <Typography fontSize={20} color="#00a876" fontWeight={700}>
                  Bank Transfer
                </Typography>
              </Button>
            </Grid>
            {/* <Grid item xs={12} container justifyContent="center" >
                            <Button
                                variant="filled"
                                sx={{
                                    height: 70,
                                    bgcolor: "#fff",
                                    width: "100%",
                                    "&:hover": {
                                        bgcolor: "#fff",
                                    },
                                    height: '65px'
                                }}
                                onClick={() => handleTopup('apple')}
                            >
                                 <Grid item xs={3} sx={{ height: '75%', position: 'relative' }}>
                                    <Image
                                        style={{ objectFit: 'contain' }}
                                        fill
                                        src="/imgs/payment-methods/applepay.svg"
                                    />
                                </Grid>
                                
                            </Button>
                        </Grid> */}
          </Grid>
        )}

        {mode === "bank" && (
          <Grid
            id="bank-transfer"
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            p={4}
          >
            <BankTransfer />
          </Grid>
        )}
        {mode === "withdraw" && (
          <Grid
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
          >
            <Withdraw handleFinishWithdraw={handleFinishWithdraw} />
          </Grid>
        )}

        {mode === "topup" && (
          <Grid
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            width={"100%"}
          >
            <Price
              handleTopupSuccess={handleTopupSuccess}
              selectedMethod={selectedMethod}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
   </>
  );
};

export default WalletNew;
