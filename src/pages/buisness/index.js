import PartnersCard from "@/components/Partners/partnersCard";
import { Box, Grid, LinearProgress, Skeleton, Typography } from "@mui/material";
import { useGetBusinessesListQuery } from "@/redux/apis/businessesApi";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { data, isLoading } = useGetBusinessesListQuery();
  const router = useRouter();
  const { t, i18n } = useTranslation();

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

      {/* <Grid container p={2}>
      {data?.data?.map((business) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} mb={5} key={business.id}>
          <PartnersCard {...business} />
        </Grid>
      ))}
      {!data?.data &&
        [...Array(7)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: 200,
              height: 200,
              margin: "0 16px 16px 0",
              borderRadius: "8px",
            }}
          />
        ))}
      <Box textAlign={"center"} width={"100%"}>
        {isLoading && <LinearProgress color="success" />}
        {(!data?.data || !data?.data?.length) && !isLoading && (
          <>
            <Typography
              lineHeight={1}
              fontSize={"600%"}
              fontWeight={1000}
              color={"#171717"}
            >
              NO DATA YET
            </Typography>
            <Typography fontWeight={200} fontSize={14}>
              Try again later
            </Typography>
          </>
        )}
      </Box> 
    </Grid> */}

      <Box textAlign={"center"} width={"100%"}>
        <>
          <Typography
            lineHeight={1}
            fontSize={"600%"}
            fontWeight={1000}
            color={"#171717"}
          >
            {t("common:home.comming_soon")}
          </Typography>
        </>
      </Box>
    </>
  );
};

export default Partners;
