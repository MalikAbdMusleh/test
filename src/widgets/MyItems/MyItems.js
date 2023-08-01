import React, { useEffect, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import ItemsTabs from "./ItemsTabs";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import SliderBlock from "../SliderBlock/SliderBlock";
import { useSelector } from "react-redux";
import ProductCardMyItem from "@/components/Cards/ProductCard/ProductCardMyItem";


import {
  useGetAuctionBySellerIdQuery, useGetPendingAuctionBySellerIdQuery, useGetEndedAuctionBySellerIdQuery,
  useGetActiveSallerBySellerIdQuery,
  useGetEndedSallerBySellerIdQuery,
  useGetPendingSallerBySellerIdQuery,
} from "@/redux/apis/auctionApi";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return value === index && <div key={index}>{children}</div>;
}

const MyItems = () => {
  const [tabVal, setTabVal] = useState(0);
  const [subTabVal, setSubTabVal] = useState(0);
  const [subTabValSale, setSubTabValSale] = useState(0);

  const [SalePendingData, setSalePendingData] = useState([]);
  const [SaleEndedData, setSaleEndedData] = useState([]);
  const [SaleActiveData, setSaleActiveData] = useState([]);

  const [AuctionActiveData, setAuctionActiveData] = useState([]);
  const [AuctionEndedData, setAuctionEndedData] = useState([]);
  const [AuctionPendingData, setAuctionPendingData] = useState([]);

  const { user } = useSelector(state => state.auth)
  const { data } = useGetAuctionBySellerIdQuery({ sellerId: user.id });

  const activeItemsAuction = useGetAuctionBySellerIdQuery({ sellerId: user.id });
  const endedItemsAuction = useGetEndedAuctionBySellerIdQuery({ sellerId: user.id });
  const pendingItemsAuction = useGetPendingAuctionBySellerIdQuery({ sellerId: user.id });

  const activeItemsSale = useGetActiveSallerBySellerIdQuery({ sellerId: user.id });
  const endedItemsSale = useGetEndedSallerBySellerIdQuery({ sellerId: user.id });
  const pendingItemsSale = useGetPendingSallerBySellerIdQuery({ sellerId: user.id });

  const items = { auction: [], sale: [] }
  const itemsData = data?.data?.reduce((acc, item) => {
    if (item.saleType === 'auction') {
      return { ...acc, auction: [...acc.auction, item] };
    }
    if (item.saleType === 'sale')
      return { ...acc, sale: [...acc.sale, item] };
  }, items);

  const setData = () => {
    activeItemsAuction?.data?.data.length > 0 ? setAuctionActiveData(activeItemsAuction?.data?.data) : false
    endedItemsAuction?.data?.data.length > 0 ? setAuctionEndedData(endedItemsAuction?.data?.data) : false
    pendingItemsAuction?.data?.data.length > 0 ? setAuctionPendingData(pendingItemsAuction?.data?.data) : false

    activeItemsSale?.data?.data.length > 0 ? setSaleActiveData(activeItemsSale?.data?.data) : false
    endedItemsSale?.data?.data.length > 0 ? setSaleEndedData(endedItemsSale?.data?.data) : false
    pendingItemsSale?.data?.data.length > 0 ? setSalePendingData(pendingItemsSale?.data?.data) : false

  }
  useEffect(() => {
    setData()
  })
  const tabs = [
    {
      label: "Auctions",
      isActive: tabVal === 0,
    },
    {
      label: "Sales",
      isActive: tabVal === 1,
    },
  ];
  const subTabs = [
    {
      label: "Active",
      isActive: subTabVal === 0,
    },
    {
      label: "Requests",
      isActive: subTabVal === 1,
    },
    {
      label: "History",
      isActive: subTabVal === 2,
    }
  ];
  const subTabsSale = [

    {
      label: "Active",
      isActive: subTabValSale === 0,
    },
    {
      label: "Requests",
      isActive: subTabValSale === 1,
    },
    {
      label: "History",
      isActive: subTabValSale === 3,
    },
  ];
  return (
    <Grid
      flexDirection={"column"}
      width={"100%"}
      padding={"2% 2% 0 2%"}
      sx={{
        "@media(max-width: 776px)": {
          padding: "1% 0px 0 10px",
        },
      }}
    >
      <SectionTitle fullWidth title={"My Items"}>
        <ItemsTabs tabs={tabs} value={tabVal} setValue={setTabVal} />
      </SectionTitle>
      <TabPanel value={tabVal} index={0}>
        <ItemsTabs tabs={subTabs} value={subTabVal} setValue={setSubTabVal} />
        <TabPanel value={subTabVal} index={0}>
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
            navigation={true}
          >
            {
              AuctionActiveData.length > 0 ? AuctionActiveData.map((el,i) => {
                return <ProductCardMyItem
                  key={i}
                  data={{
                    isActive: el?.isActive,
                    country: el?.country?.countryCode,
                    img: el?.mediaPhotos?.length ? el?.mediaPhotos[0].url : "",
                    title: el?.title,
                    info: el?.smallInfo,
                    description: el?.description,
                    analytics: el?.analytics,
                    price:
                    el?.highestBidPrice || el?.startingPrice,
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



              }) : null
            }
           </SliderBlock>
           {AuctionActiveData?.length<1&& <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:'40vh'}}>
              You have not added any items yet ! 
              </div>}
          
        </TabPanel>
        <TabPanel value={subTabVal} index={1}>
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
            navigation={true}
          >
            {
              AuctionPendingData.length > 0 ? AuctionPendingData.map((el,i) => {
                return <ProductCardMyItem
                  key={i}
                  data={{
                    isActive: el?.isActive,
                    country: el?.country?.countryCode,
                    img: el?.mediaPhotos?.length ? el?.mediaPhotos[0].url : "",
                    title: el?.title,
                    info: el?.smallInfo,
                    description: el?.description,
                    analytics: el?.analytics,
                    price:
                    el?.highestBidPrice || el?.startingPrice,
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
                  auctionDetails ={el}
                />
              }) : null
            }

          </SliderBlock>
          {AuctionPendingData?.length<1&& <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:'40vh'}}>
              You have not added any items yet ! 
              </div>}
          
        </TabPanel>
        <TabPanel value={subTabVal} index={2}>
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
            navigation={true}
          >
            {
              AuctionEndedData.length > 0 ? AuctionEndedData.map((el,i)  => {
                return <ProductCardMyItem
                key={i}
                auctionDetails ={el}

                data={{
                  isActive: el?.isActive,
                  country: el?.country?.countryCode,
                  img: el?.mediaPhotos?.length ? el?.mediaPhotos[0].url : "",
                  title: el?.title,
                  info: el?.smallInfo,
                  description: el?.description,
                  analytics: el?.analytics,
                  price:
                  el?.highestBidPrice || el?.startingPrice,
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
              }) : null
            }

          </SliderBlock>
          {AuctionEndedData?.length<1&& <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:'40vh'}}>
              You have not added any items yet ! 
              </div>}
        </TabPanel>
        {itemsData?.auction?.length === 0 &&
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 3 }}>
            <SliderBlock
              slideMaxWidth={300}
              spaceBetween={10}
              slidesPerView={"auto"}
              navigation={true}
            >
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  sx={{ width: 200, height: 200, margin: "0 16px 16px 0", borderRadius: '8px' }}
                />
              ))}
            </SliderBlock>
          </Box>
        }
      </TabPanel>
      <TabPanel value={tabVal} index={1}>
        <ItemsTabs tabs={subTabsSale} value={subTabValSale} setValue={setSubTabValSale} />
        <TabPanel value={subTabValSale} index={0}>
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
          >

            {
              SaleActiveData.length > 0 ? SaleActiveData.map((el,i)  => {
                return <ProductCardMyItem
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
                  isActive: el?.isActive,
                  featured: el?.featured,
                  state: el?.state,
                  lot: el?.lot,
                  id: el?.id,
                  startAt: el?.startAt,
                  link: `/lot-details/${el?.id}`,
                  flag: el?.country?.flagImagesUrl,
                  saleType: el?.saleType,
                }}
                auctionDetails ={el}

              />
              }) : null
            }
          </SliderBlock>
          {SaleActiveData?.length<1&& <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:'40vh'}}>
              You have not added any items yet ! 
              </div>}
          {SaleActiveData?.length === 0 &&
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 3 }}>
              <SliderBlock
                slideMaxWidth={300}
                spaceBetween={10}
                slidesPerView={"auto"}
                navigation={true}
              >
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{ width: 200, height: 200, margin: "0 16px 16px 0", borderRadius: '8px' }}
                  />
                ))}
              </SliderBlock>
            </Box>
          }
        </TabPanel>
        <TabPanel value={subTabValSale} index={1}>
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
          >
            {
              SalePendingData.length > 0 ? SalePendingData.map((el,i)  => {
                return <ProductCardMyItem
                key={i}
                data={{
                  isActive: el?.isActive,
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
                auctionDetails={el}

              />
              }) : null
            }
          </SliderBlock>
          {SalePendingData?.length<1&& <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:'40vh'}}>
              You have not added any items yet ! 
              </div>}
          {SalePendingData?.length === 0 &&
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 3 }}>
              <SliderBlock
                slideMaxWidth={300}
                spaceBetween={10}
                slidesPerView={"auto"}
                navigation={true}
              >
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{ width: 200, height: 200, margin: "0 16px 16px 0", borderRadius: '8px' }}
                  />
                ))}
              </SliderBlock>
            </Box>
          }
        </TabPanel>
        <TabPanel value={subTabValSale} index={2}>
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
          >
            {
              SaleEndedData.length > 0 ? SaleEndedData.map((el,i)  => {
                return <ProductCardMyItem
                key={i}
                data={{
                  isActive: el?.isActive,
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
                  isActive: el?.isActive,

                }}
                auctionDetails ={el}
                

              />
              }) : null
            }

          </SliderBlock>
          {SaleEndedData?.length<1&& <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:'40vh'}}>
              You have not added any items yet ! 
              </div>}
          {SaleEndedData?.length === 0 &&
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 3 }}>
              <SliderBlock
                slideMaxWidth={300}
                spaceBetween={10}
                slidesPerView={"auto"}
                navigation={true}
              >
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{ width: 200, height: 200, margin: "0 16px 16px 0", borderRadius: '8px' }}
                  />
                ))}
              </SliderBlock>
            </Box>
          }
        </TabPanel>

      </TabPanel>
    </Grid>
  );
};

export default MyItems;
