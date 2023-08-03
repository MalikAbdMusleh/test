import {
  Grid,
  CircularProgress,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import GavelIcon from "@mui/icons-material/Gavel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MyActivityItem from "./MyActivityItem/MyActivityItem";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetActivityByTypeQuery,
  useGetActivityQuery,
  useGetUserOffersActivityQuery
} from "@/redux/apis/account/myActivity.api";
import { useEffect } from "react";

const MyActivity = () => {
  const { user } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useGetActivityQuery();
  const { data: bids } = useGetActivityByTypeQuery({
    userId: user.id,
    type: "auction",
  });
 
  const { data: orders } = useGetActivityByTypeQuery({
    userId: user.id,
    type: "sale",
  });
 
  const  offers  =useGetUserOffersActivityQuery({ seller: true });
 
  const acc = { bids: [], offers: [] };
  const activityData = data?.data?.reduce((acc, item) => {
    if (item.saleType === "auction") {
      return { ...acc, bids: [...acc.bids, item] };
    }
    if (item.saleType === "sale")
      return { ...acc, offers: [...acc.offers, item] };
  }, acc);

  return (
    <Grid
      container
      marginTop={3}
      width={"100%"}
      padding={"1% 1% 0 1%"}
      sx={{
        "@media(max-width: 776px)": {
          padding: "1% 10px 0 10px",
        },
      }}
    >
      <Grid
        container
        width={"100%"}
        sx={{
          background: "#232323",
          borderRadius: 4,
          "@media (max-width: 777px)": {
            padding: "20px 10px 15px 10px",
          },
        }}
      >
        <Grid item xs={12} sm={4} padding={{ xs: 2, sm: 5 }} gap={1}>
          {isLoading && (
            <CircularProgress sx={{ color: "#00F0A9", margin: "auto" }} />
          )}
          {!isLoading && (
            <MyActivityItem
              title="Active Bids"
              Icon={GavelIcon}
              filpIcon={true}
              number={bids?.data?.length || 0}
              bids
              imgs={
                !!activityData?.bids?.length
                  ? ["/imgs/rav.png", "/imgs/vmf.png"]
                  : ["/imgs/logo-large.png"]
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} padding={{ xs: 2, sm: 5 }} gap={1}>
          {isLoading && (
            <CircularProgress sx={{ color: "#00F0A9", margin: "auto" }} />
          )}
          {!isLoading && (
            <MyActivityItem
              title="Active Offers"
              Icon={ShoppingCartIcon}
              number={offers?.data?.length || 0}
              offers
              imgs={
                !!activityData?.offers?.length
                  ? ["/imgs/rav.png", "/imgs/vmf.png"]
                  : ["/imgs/logo-large.png"]
              }
            />
          )}
          
        </Grid>
        <Grid item xs={12} sm={4} padding={{ xs: 2, sm: 5 }} gap={1}>
          {isLoading && (
            <CircularProgress sx={{ color: "#00F0A9", margin: "auto" }} />
          )}
          {!isLoading && (
            <MyActivityItem
            title="Purchased Items"
            Icon={ShoppingCartIcon}
              number={orders?.data?.length || 0}
              orders
              
              imgs={
                !!activityData?.orders?.length
                  ? ["/imgs/rav.png", "/imgs/vmf.png"]
                  : ["/imgs/logo-large.png"]
              }
            />
          )}
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyActivity;
