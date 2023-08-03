import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "cookies";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ReportIcon from '@mui/icons-material/Report';
import GavelIcon from "@mui/icons-material/Gavel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomButton from "@/components/CustomButton";

import {
  Alert,
  Button,
  Dialog,
  IconButton,
  Snackbar,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SliderBlock from "@/widgets/SliderBlock/SliderBlock";
import CustomImageList from "@/components/ImageList/ImageList";
import CustomInput from "@/components/CustomInput/CustomInput";
import CustomDialog from "@/components/CustomDialog/CustomDialog";
import GalleryModal from "@/components/GalleryModal/GalleryModal";
import FavoritesButton from "@/components/favButton/FavoritesButton";
import TopUp from "../top-up/[action]";
import Congrats from "../congrats";
import { fetchApi } from "@/helpers/fetchApi";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IOSSwitch from "@/components/IOSSwitch/IOSSwitch";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useInspectionReportStoreMutation } from "@/redux/apis/inspection-report/inspectionReportStore.api";
import { useLockBuyMutation } from "@/redux/apis/auction-salesApi/buynowApi";
import { useEffect } from "react";
import {
  useMakeOfferMutation,
  useWithdrawOfferMutation,
} from "@/redux/apis/auction-salesApi/buyerApi";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  useAcceptSpecificOfferMutation,
  useCounterOfferMutation,
  useDeclineOfferMutation,
  useGetUserOffersQuery,
} from "@/redux/apis/auction-salesApi/sellerApi";
import { makeStore } from "@/redux/store";
import InspectionPayment from "@/components/InspectionPayment/InspectionPayment";
import PaymentCardsModal from "@/components/PaymentCardsModal/PaymentCardsModal";
import {
  useGenerateStcPaymentMutation,
  useGetSavedCardsQuery,
} from "@/redux/apis/paymentApi";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Reviewpurchase from "@/components/Reviewpurchase/Reviewpurchase";
import WarningParagraph from "@/widgets/C2CForm/FormComponents/WarningParagraph";
import CardMetadata from "@/components/Cards/AuctionCard/CardMetadata/CardMetadata";
import { Visibility } from "@mui/icons-material";
const LotDetails = ( { auctionDetails, category, highestBid, error } ) => {
  if ( error ) console.log( "###ERROR" );
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery( theme.breakpoints.down( "sm" ) );
  const formattedPrice = auctionDetails?.vehiclePrice?.amount.toLocaleString();
  const { user } = useSelector( ( state ) => state.auth );
  const [ topUpSucces, setTopUpSucces ] = useState( false );
  const [ open, setOpen ] = useState( false );
  const [ lock, setLock ] = useState( false );
  const [ inspectionReportChecked, setInspectionReportChecked ] = useState( false );
  const [ openPricingOptions, setOpenPricingOptions ] = useState( false );
  const [ storeInspectionQ ] = useInspectionReportStoreMutation();
  const [ offerDialogOpen, setOfferDialogOpen ] = useState( false );
  const [ buyDialogOpen, setBuyDialogOpen ] = useState( false );
  const [ showSellerOffers, setShowSellerOffers ] = useState( false );
  const [ makeOfferQ ] = useMakeOfferMutation();
  const [ dataOffer, setDataOffer ] = useState( {

    auctionedPrice: "",
    currency: "",
  } );
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (auctionDetails?.vehicleIsLocked) {
      setDisabled(true);
    }
  }, [auctionDetails?.buyer]);
  const [ lockBuyQ ] = useLockBuyMutation();
  const [ withdrawOfferQ ] = useWithdrawOfferMutation();
  const [ acceptOfferQ ] = useAcceptSpecificOfferMutation();
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );
  const handleTopupSuccess = () => setTopUpSucces( true );
  const handleCloseTopupSuccess = () => setTopUpSucces( false );
  const handleOpenOfferDialog = () => {
    if ( user?.deposit?.amount === undefined ) router.push( "/auth" );
    else setOfferDialogOpen( true );
  };
  const handleOpenBuyDialog = () => {
    setBuyDialogOpen( true );
  };
  const handleCloseOfferDialog = () => setOfferDialogOpen( false );
  const handleCloseBuyDialog = () => setBuyDialogOpen( false );
  const checkoutSuccess = () => {
    setLock( true );
  };
  const onPayForInspection = () => setOpenPricingOptions( false );

  const enoughBalance =
    user?.deposit?.amount >= auctionDetails?.depositAmount?.amount;
  const [ snackbarState, setSnackbarState ] = useState( {
    open: false,
    message: "",
    type: "error",
  } );
  const [ offerWithdrawn, setOfferWithdrawn ] = useState( false );
  const getOffersQ = useGetUserOffersQuery(
    { auctionVehicleId: auctionDetails?.id },
    { skip: !showSellerOffers }
  );
  const [ counterOfferQ ] = useCounterOfferMutation();
  const getSavedCardsQ = useGetSavedCardsQuery();
  const [ switchState, setSwitchState ] = useState( false );
  const [ openCardsModal, setOpenCardsModal ] = useState( false );
  const [ inputValue, setInputValue ] = useState( "" );
  const [ selectedCard, setSelectedCard ] = useState();
  const [ inspectionReportId, setInspectionReportId ] = useState();
  const handleToggleCard = ( e ) => setSelectedCard( e.target.value );
  const handleToggleCardsModal = () => {
    setOpenCardsModal( ( state ) => !state );
  };

  const onPayForReport = () => {
    storeInspectionQ( auctionDetails?.id )
      .unwrap()
      .then( ( res ) => {
        setInspectionReportId( res.id );
        setOpenPricingOptions( true );
      } )
      .catch( ( e ) => {
        setSnackbarState( ( state ) => ( {
          ...state,
          open: true,
          message: e.message || e.data.payload.validation[ 0 ].errors[ 0 ].message,
        } ) );
      } );
  };

  const [ days, setDays ] = useState( 0 );
  const [ hours, setHours ] = useState( 0 );
  const [ minutes, setMinutes ] = useState( 0 );
  const [ seconds, setSeconds ] = useState( 0 );
  var secondsLeft = auctionDetails?.timeRemaining?.secondsLeft;
  const getTime = () => {
    secondsLeft--;
    setDays( Math.floor( secondsLeft / ( 1 * 60 * 60 * 24 ) ) );
    setHours( Math.floor( ( secondsLeft / ( 1 * 60 * 60 ) ) % 24 ) );
    setMinutes( Math.floor( ( secondsLeft / 1 / 60 ) % 60 ) );
    setSeconds( Math.floor( ( secondsLeft / 1 ) % 60 ) );
  };

  useEffect( () => {
    const interval = setInterval( () => getTime(), 1000 );
    return () => clearInterval( interval );
  }, [] );


  useEffect( () => {
    getTime();
    const interval = setInterval( () => getTime(), 60000 );
    return () => clearInterval( interval );
  }, [] );

  const renderImages = auctionDetails?.mediaPhotos?.map( ( item, i ) => (
    <Box key={i} sx={{ height: { xs: "200px", sm: "600px", md: "900px" } }}>
      <Image fill src={item?.url} style={{ objectFit: "contain" }} alt="" />
    </Box>
  ) );

  const propertiesMapping = [
    { title: "Make", path: auctionDetails?.vehicleModel?.vehicleMake?.name },
    { title: "Year", path: auctionDetails?.vehicleYear },
    { title: "KM", path: auctionDetails?.mileage },
    { title: "Transmission", path: auctionDetails?.vehicleTransmission },
    { title: "Body type", path: auctionDetails?.bodyType },
    { title: "Color", path: auctionDetails?.vehicleColor },
    { title: "Interior Color", path: auctionDetails?.insideColor },
    { title: "Condition", path: auctionDetails?.vehicleCondition },
    {
      title: "Interior Condition",
      path: auctionDetails?.vehicleInteriorCondition,
    },
    { title: "No. of seats", path: auctionDetails?.seatsType },
    { title: "Doors", path: auctionDetails?.doors },
    { title: "Fuel type", path: auctionDetails?.fuelType },
    { title: "Horsepower", path: auctionDetails?.horsepower },
    { title: "Cylinders", path: auctionDetails?.cylinders },
  ];

  // Temporary: filter all undefined details until there is a sample response of the details of other products (bid items)
  const filteredProperties = propertiesMapping.filter( ( p ) => p.path );

  const renderProperties = filteredProperties.map(
    ( { title, path }, i ) =>
      ( title || path ) &&
      ( path != null || path != "" ) && (
        <Grid item xs={6} md={3} key={i}>
          <Typography fontWeight={300} fontSize={13} sx={{ color: "white" }}>
            {title}
          </Typography>
          <Typography fontWeight={600}>{path} </Typography>
        </Grid>
      )
  );

  const inspectionType =
    auctionDetails?.addOns?.inspectionReport?.categoryPriceType;

  let inspectionCategory = "";
  switch ( inspectionType ) {
    case "initial":
      inspectionCategory = "inspectionInitialPrice";
      break;
    case "basic":
      inspectionCategory = "inspectionBasicPrice";
    case "advanced":
      inspectionCategory = "inspectionAdvancedPrice";
    default:
      inspectionCategory = "inspectionAdvancedPrice";
  }
  const inspectionPrice =
    auctionDetails?.vehicleModel?.categories.length > 0
      ? auctionDetails?.vehicleModel?.categories[ 0 ][ inspectionCategory ]?.amount
      : null;
  const handleBuyNow = () => {
    if ( user?.deposit?.amount === undefined ) router.push( "/auth" );
    else {
      if (enoughBalance) {
        handleOpenBuyDialog()
        if (topUpSucces || lock) {
          lockBuyQ(router.query.id)
            .unwrap()
            .then((res) => {
              if (res.error)
                setSnackbarState((state) => ({
                  ...state,
                  open: true,
                  message: res.message,
                }));
              else {
                handleBuyNow();
                // router.push(`/checkout?id=${auctionDetails?.id}`);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
      else
        router.push(
          `/wallet?type=${auctionDetails?.saleType}&id=${auctionDetails?.id}&amount=${auctionDetails?.depositAmount?.amount}`
        );
    }
  };

  const handleWithdrawOffer = () => {
    withdrawOfferQ( { auctionVehicleId: auctionDetails?.id } )
      .unwrap()
      .then( ( res ) => {
        setSnackbarState( ( state ) => ( {
          type: "success",
          open: true,
          message: "Withdrawn Successfully!",
        } ) );
        setOfferWithdrawn( true );
      } )
      .catch( ( e ) => {
        setSnackbarState( ( state ) => ( {
          type: "error",
          open: true,
          message: e.data.payload.validation[ 0 ].errors[ 0 ].message,
        } ) );
      } );
  };
  const toggleSellerOffers = () => {
    setShowSellerOffers( ( state ) => !state );
  };

  const [ declineOfferQ ] = useDeclineOfferMutation();

  const handleDeclineOffer = ( id ) => {
    declineOfferQ( { auctionVehicleSaleOfferId: id } )
      .unwrap()
      .then( ( res ) => {
        setSnackbarState( ( state ) => ( {
          type: "success",
          open: true,
          message: "Declined Successfully!",
        } ) );
      } )
      .catch( ( e ) => {
        setSnackbarState( ( state ) => ( {
          type: "error",
          open: true,
          message: e.data.payload.validation[ 0 ].errors[ 0 ].message,
        } ) );
      } );
  };

  const [ counterOfferActive, setCounterOfferActive ] = useState( false );

  const toggleCounterOffer = () => setCounterOfferActive( ( state ) => !state );
  const handleCounterOffer = ( id, amount ) => {
    counterOfferQ( { id, amount: amount } )
      .unwrap()
      .then( ( res ) => {
        setSnackbarState( ( state ) => ( {
          type: "success",
          open: true,
          message: "Counter Offer Made Successfully!",
        } ) );
        toggleCounterOffer();
      } )
      .catch( ( e ) => {
        setSnackbarState( ( state ) => ( {
          type: "error",
          open: true,
          message: e.data.payload.validation[ 0 ].errors[ 0 ].message,
        } ) );
      } );
  };

  const handleAcceptSpecificOffer = ( id ) => {
    acceptOfferQ( { auctionVehicleSaleOfferId: id } )
      .unwrap()
      .then( ( res ) => {
        setSnackbarState( ( state ) => ( {
          type: "success",
          open: true,
          message: "Offer Accepted Successfully!",
        } ) );
      } )
      .catch( ( e ) => {
        setSnackbarState( ( state ) => ( {
          type: "error",
          open: true,
          message: e.message || e.data.payload.validation[ 0 ].errors[ 0 ].message,
        } ) );
      } );
  };
  console.log("auctionDetails", auctionDetails)
  const handleAcceptCounterOffer = ( amount ) => {
    makeOfferQ( {
      auctionVehicleId: auctionDetails.id,
      amount: auctionDetails?.saleOffer?.offer?.counterOfferAmount?.amount,
      currencyCode: auctionDetails.currency.code,
    } )
      .unwrap()
      .then( ( res ) => {
        router.replace( router.asPath );
      } )
      .catch( ( e ) => {
        setSnackbarState( ( state ) => ( {
          ...state,
          open: true,
          message: !!e?.data?.payload?.validation?.length
            ? e?.data?.payload?.validation[ 0 ]?.errors[ 0 ]?.message
            : e.data.message,
        } ) );
      } );
  };

  const [ stcPaymentQ ] = useGenerateStcPaymentMutation();
  const handleCardClick = ( type ) => {
    if ( type === "stc" ) {
      stcPaymentQ( {
        amount: inspectionPrice,
        inspectionReportId,
        type: "inspection_report_advanced_buyer",
      } )
        .unwrap()
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => { });
    } else setOpenCardsModal(true);
  };

  const [counterOfferAmount, setCounterOfferAmount] = useState("");
  const renderOffers = getOffersQ?.data?.length > 0 ? (getOffersQ?.data?.map((el, i) => {
    return (
      <Box
        key={i}
        sx={{ padding: 2, borderRadius: 3, background: "rgb(0, 0, 0) !important" }}
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
              {el.counterOfferAmount.amount}
            </Typography>
          </Typography>
        )}
        <Box>
          <Button onClick={() => handleAcceptSpecificOffer( el.id )}>
            Accept
          </Button>
          <Button onClick={() => handleDeclineOffer( el.id )}>Decline</Button>
          <Button onClick={toggleCounterOffer}>Counter</Button>
        </Box>
        {counterOfferActive && (
          <Box>
            <TextField
              value={counterOfferAmount}
              type="number"
              onChange={( e ) => setCounterOfferAmount( e.target.value )}
              label="counter offer amount"
            />
            <Button
              onClick={() => handleCounterOffer( el.id, counterOfferAmount )}
            >
              Send Offer
            </Button>
            <Button onClick={toggleCounterOffer}>Cancel</Button>
          </Box>
        )}
      </Box>
    );
  })) : [];

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
      <Box sx={{ width: "90%", margin: "4% auto", paddingBottom: 10 }}>
        {isMobile ? (
          <SliderBlock slidesPerView={1} navigation={true} pagination={true}>
            {renderImages}
          </SliderBlock>
        ) : (
          <>
            <CustomImageList
              itemData={auctionDetails?.mediaPhotos}
              handleOpen={handleOpen}
            />
            <GalleryModal
              open={open}
              handleClose={handleClose}
              cmp={
                <SliderBlock
                  slidesPerView={1}
                  navigation={true}
                  pagination={true}
                >
                  {renderImages}
                </SliderBlock>
              }
            />
          </>
        )}

        <Grid container flex flexDirection={"column"} padding={1} my={2}>
          <Grid item xs={12}>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography fontWeight={700} fontSize={24}>
                  {auctionDetails?.title}
                </Typography>
              </Grid>
              <Grid item flexDirection={'row'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
             
                <VisibilityIcon sx={{ marginRight: 1, fontSize: 25 }}  />
              
            
              <span> {auctionDetails?.analytics?.views}</span> 
            
                 {auctionDetails?.saleType === "auction" && (
                  <GavelIcon
                    sx={{
                      fontSize: 25,
                      marginRight: 1,
                      marginLeft: 1,
                      transform: "scaleX(-1)",
                    }}
                  />
                )}
                {auctionDetails?.saleType === "sale" && (
                  <ShoppingCartIcon sx={{ fontSize: 25, marginRight: 1 ,marginLeft: 1,}} />
                )}
                              <span> {auctionDetails?.totalBids}</span> 

                  <Image src={auctionDetails?.country?.flagImagesUrl} alt="flag" width={40} height={25} style={{marginLeft:'15px',marginRight:'15px'}} />
                  
                <FavoritesButton
                  id={auctionDetails?.id}
                  isFavourite={auctionDetails?.isFavourite}
                />
                
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1} justifyContent={"space-between"}>
                <Grid item xs={12} md={7}>
                  <Grid container flexDirection={"column"}>
                    <Grid item my={2} xs={12}>
                      <Typography fontWeight={700} fontSize={22}>
                        Lot Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container flexWrap={"wrap"} spacing={2}>
                        {renderProperties}
                      </Grid>
                    </Grid>
                    <Grid item py={2}>
                      <Grid item my={2} xs={12}>
                        <Typography fontWeight={700} fontSize={22}>
                          Description
                        </Typography>
                      </Grid>
                      <Typography
                        fontWeight={400}
                        fontSize={14}
                        sx={{ textJustify: "inner-word", textAlign: "justify" }}
                      >
                        {auctionDetails?.description}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    my={2}
                    container
                    flexDirection={"column"}
                    justifyContent={"center"}
                  >
                    <Grid item display={"flex"} alignItems={"center"}>
                      <LocationOnIcon />
                      <Typography fontSize={16} fontWeight={600}>
                        Item Location
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="whitesmoke"
                        fontWeight={300}
                        fontSize={14}
                      >
                        {auctionDetails?.geoLocation?.length &&
                          auctionDetails?.geoLocation[ 0 ].text}
                      </Typography>
                    </Grid>
                  </Grid>
                  {inspectionPrice && (
                    <Grid
                      my={2}
                      spacing={2}
                      container
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <Grid item display={"flex"} alignItems={"center"}>
                        <IconButton
                          sx={{ background: "#00F0A9", marginRight: 2 }}
                          size="small"
                        >
                          <FindInPageIcon />
                        </IconButton>
                        <Typography fontWeight={600} fontSize={18}>
                          Inspection Report
                        </Typography>

                        {auctionDetails?.addOns?.inspectionReports?.initial?.url &&
                          <CustomButton
                            onClick={() => { window.open(auctionDetails?.addOns?.inspectionReports?.initial?.url, '_blank', 'noopener,noreferrer') }}
                            variant={"contained"}
                            sx={{
                              fontWeight: 800,
                              fontSize: ".9rem",
                              borderRadius: 1,
                              color: "black",
                              width: "15%",
                              marginLeft: '20px',
                              marginRight: '20px',
                            }}
                            label={"View"}
                          />

                        }
                      </Grid>
                      <Grid item>
                        <Typography fontWeight={500}>
                          Get an additional inspection report and valuation for
                          SAR {inspectionPrice}
                        </Typography>
                        <Typography fontWeight={300} color="grey" fontSize={14}>
                          Once you have made payment, an inspection Report for
                          this lot will be available from your account section.
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        display={"flex"}
                        width={"50%"}
                        justifyContent={"space-between"}
                      >
                        <Typography>Buy an Inspection Report</Typography>
                        <IOSSwitch
                          onChange={() =>
                            setInspectionReportChecked( ( state ) => !state )
                          }
                          value={inspectionReportChecked}
                        />
                      </Grid>
                      {inspectionReportChecked && (
                        <Grid item>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ borderRadius: 2 }}
                            onClick={onPayForReport}
                          >
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              color="black"
                            >
                              Pay for report
                            </Typography>
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    {(
                      <>
                        <Grid justifyContent={'center'} alignItems={'center'} textAlign={"center"} >

                          <Typography fontWeight={700} fontSize={22} textAlign={"center"}>
                            Ending In
                          </Typography>

                          <Typography
                            textAlign={"center"}
                            fontWeight={700}
                            fontSize={26}
                          >
                            {days}D : {hours}H : {minutes}M
                          </Typography>
                        </Grid>
                        <Divider sx={{ margin: "10px 0" }} />
                      </>
                    )}
                    <Grid item my={2}>
                      <Grid
                        container
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                      >
                        {auctionDetails?.lot && (
                          <Grid
                            item
                            fontWeight={400}
                            fontSize={22}
                            textAlign={"center"}
                          >
                            # {auctionDetails.lot}
                          </Grid>
                        )}
                        {auctionDetails?.user_id == user?.id &&
                          <Grid item padding={{ sm: 1 }} textAlign={"center"}>
                            <Box width={'100%'} display={'flex'} textAlign={"center"} alignItems={'center'} justifyContent={'center'}>
                              {/* <ReportIcon sx={{ color: 'grey', marginRight: 1 }} /> */}
                              <Typography
                                fontSize={18}
                                color={'#1ce71c'}
                                fontWeight={600}
                                textAlign={"center"}
                                variant='subtitle1'
                                display={'inline-block'}>This is your own item!</Typography>
                            </Box>
                          </Grid>
                        }
                        {auctionDetails?.saleType === "sale" && (
                          <Grid
                            item
                            fontWeight={400}
                            fontSize={26}
                            textAlign={"center"}
                          >
                            Lot Price
                          </Grid>
                        )}
                        {auctionDetails?.buyNowOption && (
                          <Grid
                            item
                            fontWeight={700}
                            fontSize={26}
                            textAlign={"center"}
                          >
                            {auctionDetails?.vehiclePrice?.currency?.code}{" "}
                            {formattedPrice}
                          </Grid>
                        )}
                        {auctionDetails?.saleType === "auction" && (
                          <>
                            <Grid
                              item
                              fontWeight={200}
                              fontSize={18}
                              textAlign={"center"}
                              my={1}
                            >
                              Starting bid
                              <Typography fontWeight={700} fontSize={20}>
                                {auctionDetails?.startingPrice?.currency?.code}{" "}
                                {auctionDetails?.startingPrice?.amount.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              fontWeight={300}
                              fontSize={14}
                              textAlign={"center"}
                              sx={{ textDecoration: "underline" }}
                            >
                              bid deposit required
                            </Grid>
                          </>
                        )}
                      </Grid>
                      {auctionDetails?.highestBidPrice?.amount &&
                        ( auctionDetails?.saleType === "auction" ||
                          auctionDetails?.saleOffer?.canAcceptOffers ) && (
                          <Grid
                            container
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                          >
                            <Grid
                              mt={2}
                              item
                              fontWeight={400}
                              fontSize={16}
                              textAlign={"center"}
                            >
                              Current Highest{" "}
                              {auctionDetails?.saleType === "sale"
                                ? "Offer"
                                : "Bid"}
                            </Grid>
                            <Grid
                              item
                              fontWeight={700}
                              fontSize={20}
                              textAlign={"center"}
                            >
                              {auctionDetails?.vehiclePrice?.currency?.code}{" "}
                              {auctionDetails?.highestBidPrice?.amount.toLocaleString()}
                            </Grid>
                          </Grid>
                        )}
                      {auctionDetails?.reservedPrice?.amount > auctionDetails?.highestBidPrice?.amount && (
                        <Grid item textAlign={"center"}>
                          <Typography fontSize={18} color={"rgb(160,70,88)"}>
                            Reserve Price Not Met
                          </Typography>
                        </Grid>
                      )}
                    </Grid>

                    <Divider sx={{ margin: "10px 0" }} />
                    {disabled && (
                      <Grid item textAlign={"center"}>
                        <Typography fontSize={18} color={"rgb(160,70,88)"}>
                          This sale is reserved
                        </Typography>
                      </Grid>
                    )}
                    {auctionDetails?.saleType === "auction" && !auctionDetails?.buyNowOption &&
                      auctionDetails?.user_id !== user?.id && (
                      <Grid item textAlign={"center"}>
                        <Typography fontSize={18} color={"rgb(160,70,88)"}>
                          Buy now option is not available.
                        </Typography>
                      </Grid>
                    )}
                    {auctionDetails?.saleType === "auction" &&
                      auctionDetails?.user_id !== user?.id &&
                      auctionDetails?.saleOffer?.offer?.state !==
                      "accepted" && (
                        <Grid item xs={12} textAlign={"center"}>
                          <CustomButton
                            onClick={() => handleOpenOfferDialog()}
                            variant={"contained"}
                            sx={{
                              fontWeight: 800,
                              fontSize: ".9rem",
                              borderRadius: 1,
                              color: "black",
                              width: "84%",
                            }}
                            label={"Place Bid"}
                            disabled={disabled}
                          />
                        </Grid>
                      )}

                    {auctionDetails?.buyNowOption &&
                      auctionDetails?.user_id !== user?.id &&
                      auctionDetails?.saleOffer?.offer?.state !==
                      "accepted" && (
                        <Grid
                          item
                          textAlign={"center"}
                          py={1}
                        >
                          <CustomButton
                            onClick={handleBuyNow}
                            variant={"contained"}
                            sx={{
                              fontWeight: 800,
                              fontSize: ".9rem",
                              borderRadius: 1,
                              height: "80%",
                              color: "black",
                              width: "84%",
                            }}
                            label={"Buy Now"}
                            disabled={disabled}
                          />
                        </Grid>
                      )}
                    {auctionDetails?.saleType === "sale" &&
                      auctionDetails?.saleOffer?.canAcceptOffers &&
                      auctionDetails?.user_id !== user?.id &&
                      auctionDetails?.saleOffer?.offer?.state !==
                      "accepted" && (
                        <Grid item textAlign={"center"}>
                          <CustomButton
                            onClick={() => handleOpenOfferDialog()}
                            variant={"contained"}
                            sx={{
                              fontWeight: 800,
                              fontSize: ".9rem",
                              borderRadius: 1,
                              height: "80%",
                              color: "black",
                              width: "84%",
                            }}
                            label={"Make Offer"}
                            disabled={disabled}
                          />
                        </Grid>
                      )}
                    {auctionDetails?.saleType === "sale" &&
                      auctionDetails?.saleOffer?.offer?.amount?.amount &&
                      !offerWithdrawn &&
                      auctionDetails?.user_id !== user?.id &&
                      auctionDetails?.saleOffer?.offer?.state !==
                      "accepted" && (
                        <Grid item margin="auto" width="84%">
                          <Grid
                            container
                            alignItems={"flex-end"}
                            justifyContent={"space-between"}
                            width="100%"
                          >
                            <Grid item xs={6}>
                              <Grid item mb={1}>
                                <Typography>
                                  Your offer: &nbsp;
                                  <Typography
                                    fontSize={14}
                                    color={"red"}
                                    sx={{ display: "inline-block" }}
                                  >
                                    {auctionDetails?.saleOffer?.offer?.declined
                                      ? "Declined"
                                      : ""}
                                  </Typography>
                                  <Typography fontWeight={600}>
                                    {
                                      auctionDetails?.saleOffer?.offer?.amount
                                        .currency.code
                                    }
                                    {auctionDetails?.saleOffer?.offer?.amount.amount.toLocaleString()}
                                  </Typography>
                                </Typography>
                              </Grid>

                              {!auctionDetails?.saleOffer?.offer?.declined && (
                                <Grid item>
                                  <CustomButton
                                    onClick={() => handleWithdrawOffer()}
                                    variant={"contained"}
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: ".9rem",
                                      borderRadius: 1,
                                      height: "80%",
                                      color: "white",
                                      width: "90%",
                                      backgroundColor: "secondary.light",
                                    }}
                                    label={"Withdraw"}
                                  />
                                </Grid>
                              )}
                            </Grid>
                            {auctionDetails?.saleOffer?.offer?.counterOffer && (
                              <Grid item xs={6}>
                                <Grid container flexDirection={"column"}>
                                  <Grid item mb={1}>
                                    <Typography>
                                      Counter offer: &nbsp;
                                      <Typography fontWeight={600}>
                                        {
                                          auctionDetails?.saleOffer?.offer
                                            ?.counterOfferAmount?.currency.code
                                        }
                                        {auctionDetails?.saleOffer?.offer?.counterOfferAmount?.amount.toLocaleString()}
                                      </Typography>
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <CustomButton
                                      onClick={() => handleAcceptCounterOffer()}
                                      variant={"contained"}
                                      sx={{
                                        fontWeight: 800,
                                        fontSize: ".9rem",
                                        borderRadius: 1,
                                        height: "80%",
                                        width: "90%",
                                        backgroundColor: "primary.dark",
                                      }}
                                      label={"Accept"}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}

                    {auctionDetails?.user_id === user?.id &&
                      auctionDetails?.saleOffer?.offer?.state !== "accepted" &&
                      auctionDetails?.saleType === "sale" && (
                        <Grid
                          item
                          textAlign={"center"}
                          py={1}
                          onClick={toggleSellerOffers}
                        >
                          <CustomButton
                            variant={"contained"}
                            sx={{
                              fontWeight: 800,
                              fontSize: ".9rem",
                              borderRadius: 1,
                              height: "80%",
                              color: "black",
                              width: "84%",
                            }}
                            label={"Offers"}
                          />
                        </Grid>
                      )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ margin: "10px 0" }} />
          {showSellerOffers && (
            <Grid container>
              <SliderBlock
                slideMaxWidth={600}
                spaceBetween={20}
                slidesPerView={"auto"}
                navigation={true}
              >
                {renderOffers}
              </SliderBlock>
              {renderOffers?.length < 1 && <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100vw" }}>
                You don't have an offers yet !
              </div>}
            </Grid>
          )}
          <Snackbar
            open={snackbarState.open}
            onClose={() =>
              setSnackbarState( ( state ) => ( { ...state, open: false } ) )
            }
            autoHideDuration={2000}
          >
            <Alert severity={snackbarState.type}>{snackbarState.message}</Alert>
          </Snackbar>
          <CustomDialog
            type={auctionDetails?.saleType}
            open={offerDialogOpen}
            handleClose={handleCloseOfferDialog}
            component={
              topUpSucces ? (
                <Congrats
                  inputValue={inputValue}
                  switchState={switchState}
                  auctionDetails={auctionDetails}
                  title={`${auctionDetails?.saleType === "sale" ? "Offer" : "Bid"
                    } placed successfuly!`}
                  type={auctionDetails?.saleType === "sale" ? "offer" : "bid"}
                  handleCloseTopupSuccess={handleCloseTopupSuccess}
                  dataOffer={dataOffer}
                />
              ) : (
                <TopUp
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  switchState={switchState}
                  setSwitchState={setSwitchState}
                  userBalance={user?.deposit}
                  auctionDetails={auctionDetails}
                  handleTopupSuccess={handleTopupSuccess}
                  type={auctionDetails?.saleType === "sale" ? "offer" : "bid"}
                  setDataOffer={setDataOffer}
                />
              )
            }
          />
          {/* buy now */}
          <CustomDialog
            type={auctionDetails?.saleType}
            open={buyDialogOpen}
            handleClose={handleCloseBuyDialog}
            component={
              <Reviewpurchase
                snackbarState={snackbarState}
                handleCloseTopupSuccess={handleCloseTopupSuccess}
                type={auctionDetails?.saleType === "sale" ? "offer" : "bid"}
                auctionDetails={auctionDetails}
                checkoutSuccess={checkoutSuccess}
              />
            }
          />
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
            amount={inspectionPrice}
            type="inspection_report_advanced_buyer"
            inspectionReportId={inspectionReportId}
          />
        </Grid>
      </Box>
    </>
  );
};
export default LotDetails;

export const getServerSideProps = async ( { req, res, query } ) => {
  const cookies = new Cookies( req, res );
  const accessToken = cookies.get( "accessToken" );
  const headers = { Authorization: `Bearer ${accessToken}` };

  const auctionId = query.id;
  const auctionDetails = await fetchApi( {
    url: `auction-vehicles/${auctionId}`,
    headers,
  } );
  const auctionTypes = await fetchApi( {
    url: `auction-vehicle-types`,
    headers,
  } );

  return {
    props: {
      auctionDetails,
      category: auctionTypes.filter( ( item ) => {
        return item.id == auctionDetails?.auctionVehicleTypeId;
      } ),
    },
  };
};
