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

export default function Activity(props) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { type } = router.query;
  if (!type) router.replace("/account");
  const bidsData = useGetActivityByTypeQuery({ type: type, userId: user.id });
  const getOffersQ = useGetUserOffersActivityQuery({ seller: true });

  useEffect(() => {
    console.log(props);
  }, [bidsData]);

  const useAuctionDetails = (auctionId) => {
    const getAuctionQ = useGetAuctionDetailsbyIDQuery({ id: auctionId }, { skip: !auctionId });
    const { currentData } = getAuctionQ;
    return currentData;
  };

  const AuctionOffersCard = ({ auctionId }) => {
    const currentData = useAuctionDetails(auctionId);

    return currentData && (
      <ProductCardMain
        key={auctionId}
        data={{
          country: currentData?.country?.countryCode,
          img: currentData?.mediaPhotos?.length ? currentData?.mediaPhotos[0].url : "",
          title: currentData?.title,
          info: currentData?.smallInfo,
          description: currentData?.description,
          analytics: currentData?.analytics,
          price: currentData?.vehiclePrice ?? (currentData?.highestBidPrice || currentData?.startingPrice),
          deadline: currentData?.endAt,
          isFav: currentData?.isFavourite,
          totalBids: currentData?.totalBids,
          featured: currentData?.featured,
          id: currentData?.id,
          startAt: currentData?.startAt,
          link: `/lot-details/${auctionId}`,
          flag: currentData?.country?.flagImagesUrl,
          saleType: currentData?.saleType,
        }}
      />
    );
  };

  const renderCards = () =>
    getOffersQ?.data?.map((el, i) =>{ console.log(el); 
      return (
      <Box key={i}>
        <AuctionOffersCard auctionId={el.auctionVehicleId} />
      </Box>
    )}
    );

  const renderBidsCards = () =>
    bidsData?.data?.data?.map((el, i) => {
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
          {type === "auction" ? "Active Bids" : "Active Offers"}
        </Typography>
      </Box>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <SliderBlock
          slideMaxWidth={300}
          spaceBetween={30}
          slidesPerView={"auto"}
          navigation={true}
        >
          {type === "auction" ? renderBidsCards() : renderCards()}
        </SliderBlock>
      </Container>
    </div>
  );
}
