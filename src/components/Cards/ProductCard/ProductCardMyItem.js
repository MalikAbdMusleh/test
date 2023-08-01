import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CustomTag from "../../CustomTag/CustomTag";
import FeaturedTag from "../../Tags/FeaturedTag/FeaturedTag";
import {
  Box,
  Divider,
  Alert,
  Button,
  Dialog,
  IconButton,
  Snackbar,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CardMetadata from "./CardMetadata/CardMetadata";
import CardMainData from "./CardMainData/CardMainData";
import TimerTag from "../../Tags/TimerTag/TimerTag";
import CardDescription from "./CardDescription/CardDescription";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";
import Image from "next/image";
import { Grid } from "swiper";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import CustomDialog from "@/components/CustomDialog/CustomDialog";
import Typography from "@mui/material/Typography";

import {
  useAcceptSpecificOfferMutation,
  useCounterOfferMutation,
  useDeclineOfferMutation,
  useGetUserOffersQuery,
} from "@/redux/apis/auction-salesApi/sellerApi";
import SliderBlock from "@/widgets/SliderBlock/SliderBlock";
import OfferCard from "./OfferCard";

export default function ProductCardMyItem({ data, auctionDetails }) {
  // 'https://cdn-staging.mazadakapp.com/country-flags/sa.png'
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error",
  });
  const handleCloseOfferDialog = () => {
    getOffertslist()
    setOfferDialogOpen((state) => !state);
  };
  const [counterOfferQ] = useCounterOfferMutation();

  const getOffersQ = useGetUserOffersQuery(
    { auctionVehicleId: data?.id },
    { skip: false }
  );
console.log(auctionDetails);

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
  const [renderOffers, setrenderOffers] = useState([]);
  const getOffertslist = () => {
    getOffersQ?.data?.length > 0 && setrenderOffers(getOffersQ?.data)
  }

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
    <div>
      <Link
        href={{ pathname: data?.link }}
        style={{ textDecoration: "none" }}
        className={`item-${data?.id}`}
      >
        <Card
          dir="ltr"
          sx={{
            minWidth: 290,
            maxWidth: 290,
            overflow: "visible",
            borderRadius: 3,
          }}
        >
          <Box sx={{ position: "relative", height: 200, width: 290 }}>
            <CardMedia
              alt="card"
              sx={{ borderRadius: 2 }}
              xs={{ width: "100%", height: "100%" }}
            >
              <Image
                src={data?.img}
                fill
                alt="cardimg"
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
            </CardMedia>
            {data?.featured && (
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 0,
                  width: "100%",
                  color: "white",
                }}
              >
                <CustomTag color={"#00F0A9"} tagContent={<FeaturedTag />} />
              </Box>
            )}
          </Box>
          <CardContent sx={{ paddingRight: 0, paddingBottom: 0 }}>
            {/* <CardMetadata
            category={data?.catName}
            flag={data?.flag}
            fav={{
              id: data?.id,
              isFav: data?.isFav,
            }}
            lot={data?.lot}
          /> */}
          {data?.isActive ? 
            <CardMainData
              heading={data?.title}
              tag={
                <CustomTag
                  color={"#FFFFFF"}
                  dir="ltr"
                  tagContent={<TimerTag deadline={data?.deadline} />}
                />
              }
            />:
              <CardMainData
              heading={data?.title}
           
            />}

            <div style={{ display: "flex" }}>
              {data?.lot && <CardMainData heading={`Lot #: ${data.lot}`} />}
              {/* {data?.state && <CardMainData heading={`State: ${data.state}`} />} */}
            </div>

            {/* <CardDescription info={data?.info} description={data?.description} /> */}
            <div style={{ paddingRight: 12, margin: "12px 0" }}>
              <Divider sx={{ borderColor: "white" }} />
            </div>
          </CardContent>
          <CardFooter
            data={{
              ...data?.analytics,
              totalBids: data?.totalBids,
              saleType: data?.saleType,
            }}
            price={data?.price}
          />
        </Card>
      </Link>
      {
        data?.totalBids > 0 && (
          <div
            item
            textAlign={"center"}
            style={{ width: '100%' }}
            py={1}
            onClick={handleCloseOfferDialog}
          >
            <CustomButton
              variant={"contained"}
              style={{ width: '100%' }}
              sx={{
                fontWeight: 800,
                fontSize: ".9rem",
                borderRadius: 1,
                height: "80%",
                color: "black",
                width: "84%",
              }}
              label={"Offers"}
            /> </div>

        )}
      <CustomDialog
        //type={auctionDetails?.saleType}
        open={offerDialogOpen}
        handleClose={handleCloseOfferDialog}
        component={
          <div>
            {(
              <div  >
                <SliderBlock
                  slideMaxWidth={600}
                  spaceBetween={20}
                  slidesPerView={"auto"}
                  navigation={true}
                >
                  {renderOffers?.length > 0 ? (getOffersQ?.data?.map((el,index) =>  <OfferCard el={el} key={index}/>
                   
                  )) : []}
                  
                </SliderBlock>
                {renderOffers?.length<1&&<div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw"}}>
                You don't have an offers yet ! 
                </div>}
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
