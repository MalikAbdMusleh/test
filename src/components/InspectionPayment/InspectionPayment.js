import { Button } from "@mui/material";
import { Dialog, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const InspectionPayment = ({
  openPricingOptions,
  setOpenPricingOptions,
  handleCardClick,
}) => {
  const onPayForInspection = () => setOpenPricingOptions(false);
  return (
    <Dialog
      onClose={() => setOpenPricingOptions(false)}
      open={openPricingOptions}
      PaperProps={{
        sx: {
          // background: 'none',
          // boxShadow: 'none'
          padding: 4,
          borderRadius: 3,
        },
      }}
    >
      <Grid
        container
        borderRadius="12px 12px 0px 0px"
        sx={{ transition: "all 1s ease-out" }}
        justifyContent={"center"}
      >
        <Grid item mb={2}>
          <Typography fontWeight={600}>Choose payment method</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignSelf: 'flex-end',
            width: '100%',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
            onClick={() => handleCardClick("card")}
            >
              <Grid
                container
                justifyContent="space-around"
                alignItems={"center"}
                height={"40px"}
              >
                <Grid item xs={3} sx={{ height: "100%", position: "relative" }}>
                  <Image
                    style={{ objectFit: "contain" }}
                    fill
                    src="/imgs/paymentIcons/mc.svg"
                    alt="master card"
                  />
                </Grid>
                <Grid item xs={4} sx={{ height: "100%", position: "relative" }}>
                  <Image
                    style={{ objectFit: "contain" }}
                    fill
                    src="/imgs/paymentIcons/visa.svg"
                    alt="visa"
                  />
                </Grid>
                <Grid item xs={3} sx={{ height: "100%", position: "relative" }}>
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
              onClick={() => handleCardClick( "stc" )}
            >
              <img src="/imgs/paymentIcons/stc.svg" alt="stc"/>
            </Button>
          </Grid>
          <Link
                href={{
                  pathname: "/topUp",
                  query: { paymentComplete: "true" },
                }}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Button
                  xs={12}
                  style={{
                    width: '100%',
                    height: '41.68px',
                    border: '1px solid #00F0A9',
                    borderRadius: ' 50.5px',
                    fontWeight: 600,
                    fontSize: '15px',
                    lineHeight: '18px',
                    marginBottom: '10px',
                    textAlign: 'center',
                  }}
                >
                  Bank Transfer
                </Button>
              </Link>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default InspectionPayment;
