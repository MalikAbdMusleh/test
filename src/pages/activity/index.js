import React, { useState } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import ProductCardMain from "@/components/Cards/ProductCard/ProductCardMain";
import { ChevronLeft } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useGetActivityByTypeQuery,
  useGetUserOffersActivityQuery,
} from "@/redux/apis/account/myActivity.api";
import { useEffect } from "react";
import SliderBlock from "@/widgets/SliderBlock/SliderBlock";
import { useSelector } from "react-redux";
import {
  useGetUserOffersQuery,
} from "@/redux/apis/auction-salesApi/sellerApi";
import { useGetAuctionDetailsbyIDQuery } from '@/redux/apis/auctionApi'
import CustomButton from "@/components/CustomButton";
import CustomDialog from "@/components/CustomDialog/CustomDialog";
import {
  useMakeOfferMutation,
  useWithdrawOfferMutation,
} from "@/redux/apis/auction-salesApi/buyerApi";


export default function Activity(props) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { type } = router.query;
  if (!type) router.replace("/account");
  const bidsData = useGetActivityByTypeQuery({ type: type, userId: user.id });
  const getOffersQ = useGetUserOffersActivityQuery({ seller: true });
  const ordersList = useGetActivityByTypeQuery({
    userId: user.id,
    type: "sale",
  });

  useEffect(() => {
    console.log(props);
  }, [bidsData]);

  const useAuctionDetails = (auctionId) => {
    const getAuctionQ = useGetAuctionDetailsbyIDQuery({ id: auctionId }, { skip: !auctionId });
    const { currentData } = getAuctionQ;
    return currentData;
  };

  const AuctionOffersCard = ({ auctionId }) => {
    const el = useAuctionDetails(auctionId);
    const [offerDialogOpen, setOfferDialogOpen] = useState(false);

    const handleCloseOfferDialog = () => {
      setOfferDialogOpen(!offerDialogOpen);
    };

    const [makeOfferQ] = useMakeOfferMutation();

    const handleAcceptCounterOffer = (amount) => {
      makeOfferQ({
        auctionVehicleId: el.id,
        amount: el?.saleOffer?.offer?.counterOfferAmount?.amount,
        currencyCode: el.currency.code,
      })
        .unwrap()
        .then((res) => {
          window.location.reload()
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const [withdrawOfferQ] = useWithdrawOfferMutation();

    const handleWithdrawOffer = () => {
      withdrawOfferQ({ auctionVehicleId: el?.id })
        .unwrap()
        .then((res) => {
          window.location.reload()
          setOfferWithdrawn(true);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    return el && (
      <div>
        <ProductCardMain
          key={auctionId}
          data={{
            country: el?.country?.countryCode,
            img: el?.mediaPhotos?.length ? el?.mediaPhotos[0].url : "",
            title: el?.title,
            info: el?.smallInfo,
            description: el?.description,
            analytics: el?.analytics,
            price:
              el?.vehiclePrice ?? (el?.highestBidPrice || el?.startingPrice),
            deadline: el?.endAt,
            isFav: el?.isFavourite,
            totalBids: el?.totalBids,
            featured: el?.featured,
            state: el?.state,
            lot: el?.lot,
            id: el?.id,
            startAt: el?.startAt,
            link: `/lot-details/${el?.id}`,
            flag: el?.country?.flagImagesUrl,
            saleType: el?.saleType,
          }}
        />
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
            label={"View Offer"}
          />

        </div>
        <CustomDialog
          //type={auctionDetails?.saleType}
          open={offerDialogOpen}
          handleClose={handleCloseOfferDialog}
          component={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: '100%' }}>
              {el?.saleType === "sale" &&
                el?.saleOffer?.offer?.amount?.amount &&
                el?.user_id !== user?.id && (
                  <Grid container
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={'flex'}
                    flexDirection={'column'}
                    width="100%">
                    <Grid item mb={1} width={'90%'}>
                      <Typography>
                        Your offer: &nbsp;
                        <Typography
                          fontSize={14}
                          color={"red"}
                          sx={{ display: "inline-block" }}
                        >
                          {el?.saleOffer?.offer?.declined
                            ? "Declined"
                            : ""}
                        </Typography>
                        <Typography fontWeight={600}>
                          {
                            el?.saleOffer?.offer?.amount
                              .currency.code + ' '
                          }
                          {el?.saleOffer?.offer?.amount.amount.toLocaleString()}
                        </Typography>
                      </Typography>
                    </Grid>


                    {!el?.saleOffer?.offer?.declined && (
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
                    )}

                  </Grid>
                )}
              {el?.saleOffer?.offer?.counterOffer && (
                <Grid
                  container
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={'flex'}
                  flexDirection={'column'}
                  width="100%"
                >
                  <Grid item mb={1} width={'90%'}>
                    <Typography>
                      Counter offer: &nbsp;
                      <Typography fontWeight={600}>
                        {
                          el?.saleOffer?.offer
                            ?.counterOfferAmount?.currency.code + ' '
                        }
                        {el?.saleOffer?.offer?.counterOfferAmount?.amount.toLocaleString()}
                      </Typography>
                    </Typography>
                  </Grid>
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
              )}

            </div>
          }
        />
      </div>
    );
  };

  const renderCards = () =>
    getOffersQ?.data?.map((el, i) => {
      console.log(el);
      return (
        <Box key={i}>
          <AuctionOffersCard auctionId={el.auctionVehicleId} />
        </Box>
      )
    }
    );

  const renderBidsCards = (itemsList) =>
    itemsList?.data?.data?.map((el, i) => {
      return (
        <>
          <ProductCardMain
            key={i}
            data={{
              country: el?.country?.countryCode,
              img: el?.mediaPhotos?.length ? el?.mediaPhotos[0].url : "",
              title: el?.title,
              info: el?.smallInfo,
              description: el?.description,
              analytics: el?.analytics,
              price:
                el?.vehiclePrice ?? (el?.highestBidPrice || el?.startingPrice),
              deadline: el?.endAt,
              isFav: el?.isFavourite,
              totalBids: el?.totalBids,
              featured: el?.featured,
              state: el?.state,
              lot: el?.lot,
              id: el?.id,
              startAt: el?.startAt,
              link: `/lot-details/${el?.id}`,
              flag: el?.country?.flagImagesUrl,
              saleType: el?.saleType,
            }}
          />
        </>
      );
    });
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={3}
      >
        <Link href={"/account"}>
          <ChevronLeft color="white" />
        </Link>
        <Typography variant="h4" flexGrow={1} textAlign={"center"} padding={3}>
          {type === "orders" ? 'Purchased Items' : type === "auction" ? "Active Bids" : "Active Offers"}
        </Typography>
      </Box>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <SliderBlock
          slideMaxWidth={300}
          spaceBetween={30}
          slidesPerView={"auto"}
          navigation={true}
        >
          {type === "orders" ? renderBidsCards(ordersList) : type === "auction" ? renderBidsCards(bidsData) : renderCards()}
        </SliderBlock>
      </Container>
    </div>
  );
}
