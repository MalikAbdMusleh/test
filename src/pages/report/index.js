import React, { useEffect, useState } from "react";
import { Alert, Badge, Box, Card, Grid, Snackbar, Typography } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { useRouter } from "next/router";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useInspectionReportListingsQuery } from "@/redux/apis/inspection-report/inspectionReportList.api";
import Image from "next/image";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InspectionPayment from "@/components/InspectionPayment/InspectionPayment";
import { useGenerateStcPaymentMutation, useGetSavedCardsQuery } from "@/redux/apis/paymentApi";
import PaymentCardsModal from "@/components/PaymentCardsModal/PaymentCardsModal";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Link from "next/link";

const Report = () => {
  const router = useRouter();
  const getListingsQ = useInspectionReportListingsQuery();
  const [openPricingOptions, setOpenPricingOptions] = useState(false);

  const [selectedInspectionReport, setSelectedInspectionReport] = useState();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    type: 'error'
  });
  const handleSelectReport = (report) => {
    if (report.state === 'Pending') {
      setSelectedInspectionReport(report)
      setOpenPricingOptions(true)
    }
    if (report.state === 'Confirmed' && !report?.advancedReport?.url) {
      setSnackbarState(state => ({
        type: 'warning',
        open: true,
        message: 'Inspection report File is not yet available.'
      }))

    }
  }
  console.log(getListingsQ);
  const getSavedCardsQ = useGetSavedCardsQuery();

  const [openCardsModal, setOpenCardsModal] = useState(false);
  const handleToggleCardsModal = () => {
    setOpenCardsModal(state => !state)
  }

  const handleToggleCard = (e) => setSelectedCard(e.target.value);

  const [stcPaymentQ] = useGenerateStcPaymentMutation();
  const handleCardClick = (type) => {
    if (type === 'stc') {
      stcPaymentQ({ amount: selectedInspectionReport?.totalAmount?.amount, inspectionReportId: selectedInspectionReport?.id, type: 'inspection_report_advanced_buyer' }).unwrap()
        .then((res) => {
          window.location.reload();
        }).catch(e => {
        })
    } else setOpenCardsModal(true)
  }

  const renderCards = getListingsQ?.data?.data?.map(listing => {
    return (
      <Grid
        key={listing?.id}
        width='300px'
        item
        py={1}
        my={1}
        px={{sm: 1}}
        mx={{sm: 1}}
        sx={{ borderRadius: 7, background: 'rgba(123,123,123,.3)' }}
        onClick={() => handleSelectReport(listing)}
      >
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          href={listing.state === 'Confirmed' && listing?.advancedReport?.url ? listing?.advancedReport?.url : ''}
          target={listing.state === 'Confirmed' && listing?.advancedReport?.url ? '_blank' : ''}
        >
          <Grid container alignItems={'center'}>
            <Grid item mr={2}>
              <Box
                position={'relative'}
                width={75}
                height={75}
                borderRadius={4}
              >
                <Image
                  fill
                  style={{ objectFit: 'cover', borderRadius: 6 }}
                  src={listing.auctionVehicle?.mediaPhotos[0]?.url}
                />
              </Box>
            </Grid>
            <Grid item>
              <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item xs={listing.state === 'Confirmed' && !listing?.advancedReport?.url ? 12 : 11}>
                  <Grid container flexDirection={'column'}>
                    <Grid item>
                      <Typography fontWeight={600}>Lot {listing.auctionVehicle.lot}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography fontSize={14} color={listing.state === 'Pending' ? '#ff7961' : '#00F0A9'}>{listing.state} Payment</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Grid container alignItems={'end'} flexDirection={'column'}>
                    {
                      listing.state === 'Confirmed' && listing?.advancedReport?.url &&
                      <Grid item pr={2}>
                        <FileOpenIcon fontSize="16px" />
                      </Grid>
                    }
                    {listing.state === 'Pending' &&
                      < Grid item pr={2}>
                        <ArrowForwardIosIcon fontSize="16px" />
                      </Grid>
                    }
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Link>
      </Grid >
    )
  })


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
      <Grid container flex flexDirection={"column"} my={2}>
        <Grid item>
          <Grid container>
            {renderCards}
          </Grid>
        </Grid>
        <InspectionPayment
          openPricingOptions={openPricingOptions}
          setOpenPricingOptions={setOpenPricingOptions}
          handleCardClick={handleCardClick}
        />
        <PaymentCardsModal
          savedCards={getSavedCardsQ?.data}
          openCardsModal={openCardsModal}
          handleToggleCardsModal={handleToggleCardsModal}
          handleToggleCard={handleToggleCard}
          amount={selectedInspectionReport?.totalAmount?.amount}
          type="inspection_report_advanced_buyer"
          inspectionReportId={selectedInspectionReport?.id}
        />
        <Snackbar
          open={snackbarState.open}
          onClose={() =>
            setSnackbarState((state) => ({ ...state, open: false }))
          }
          autoHideDuration={2000}
        >
          <Alert severity={snackbarState.type}>{snackbarState.message}</Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Report;
