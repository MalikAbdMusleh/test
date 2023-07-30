import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CustomTag from "../../CustomTag/CustomTag";
import FeaturedTag from "../../Tags/FeaturedTag/FeaturedTag";
import { Box, Divider } from "@mui/material";
import CardMetadata from "./CardMetadata/CardMetadata";
import CardMainData from "./CardMainData/CardMainData";
import TimerTag from "../../Tags/TimerTag/TimerTag";
import CardDescription from "./CardDescription/CardDescription";
import CardFooter from "./CardFooter/CardFooter";
import Link from "next/link";
import Image from "next/image";

export default function ProductCardMain({ data }) {
  // 'https://cdn-staging.mazadakapp.com/country-flags/sa.png'
  return (
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
          <CardMetadata
            category={data?.catName}
            flag={data?.flag}
            fav={{
              id: data?.id,
              isFav: data?.isFav,
            }}
            lot={data?.lot}
          />

          <CardMainData
            heading={data?.title}
            tag={
              <CustomTag
                color={"#FFFFFF"}
                dir="ltr"
                tagContent={<TimerTag deadline={data?.deadline} />}
              />
            }
          />

          <div style={{ display: "flex" }}>
            {data?.lot && <CardMainData heading={`Lot #: ${data.lot}`} />}
            {data?.state && <CardMainData heading={`State: ${data.state}`} />}
          </div>

          <CardDescription info={data?.info} description={data?.description} />
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
  );
}
