import { Grid, Typography } from "@mui/material";
import ImageLayers from "@/components/ImageLayers/ImageLayers";
import Link from "next/link";

export default function MyActivityItem({
  title,
  Icon,
  filpIcon = false,
  number,
  bids = false,
  offers = false,
  orders=false,
  imgs,
}) {
  return (
    <Grid xs={true} padding={0} width={"100%"} item>
      <Link
        href={`/activity?type=${orders?'orders':bids ? "auction" : "sale"}`}
        style={{ cursor: "pointer", textDecoration: "none", color: "unset" }}
      >
        <Grid
          item
          marginBottom={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            fontSize={18}
            fontWeight={400}
            sx={{
              "@media (max-width: 777px)": {
                fontSize: "14px",
              },
            }}
          >
            {title}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon
              color={"primary"}
              sx={{
                marginRight: 0.5,
                fontSize: 26,
                transform: filpIcon && "scaleX(-1)",
                "@media (max-width: 777px)": {
                  fontSize: "14px",
                },
              }}
            />
            <Typography
              fontSize={16}
              color={"primary"}
              sx={{
                "@media (max-width: 777px)": {
                  fontSize: "14px",
                },
              }}
            >
              ({number})
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} position={"relative"}>
          <ImageLayers
            imgs={imgs}
            imgWidth={600}
            imgHeight={300}
            maxWidth={400}
            mobileWidth={100}
            mobileHeight={100}
          />
           
        </Grid>
      </Link>
    </Grid>
  );
}
