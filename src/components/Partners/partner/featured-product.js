import { Box, Stack, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

import { Grid } from "swiper";

import partnerStyles from "../partners.module.css";
import ProductCardMain from "@/components/Cards/ProductCard/ProductCardMain";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSmall from "@/components/Cards/ProductCard/ProductCardSmall";
import PartnersCard from "../partnersCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const FeaturedProducts = ({ type, title, viewMore }) => {
  const carData = {
    img: "./imgs/mercedes.png",
    heading: "mercedes",
    category: "cars",
    flag: "jo",
    description: "2015 Mercedes -Benz S-Class S350 BlueTec",
    note: "10000 km",
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={700} className={partnerStyles["title"]}>
          {title}
        </Typography>

        {viewMore && (
          <Box display={"flex"} alignItems={"center"}>
            <Typography>See All </Typography>
            <ChevronRightIcon></ChevronRightIcon>
          </Box>
        )}
      </Box>

      <Swiper
        dir="ltr"
        // style={{ padding: "0rem 2rem" }}
        modules={[Grid]}
        className={`mySwiper margin-top`}
        slidesPerView={4}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1.25,
            spaceBetween: 10,
          },

          400: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          630: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

          //   850: {
          //     slidesPerView: 5.75,
          //     spaceBetween: 30,
          //   },
          980: {
            slidesPerView: 4.75,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    imgDimentions={{ height: 20, width: 20 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                tag: true,
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>{" "}
        <SwiperSlide className={partnerStyles["width-auto"]}>
          {type === "main" ? (
            <ProductCardMain
              {...carData}
              img={"/imgs/mercedes.png"}
            ></ProductCardMain>
          ) : (
            <ProductCardSmall
              title={title}
              data={{
                img: "/imgs/vc.png",
                heading: "bmw",
                category: "cars",
                logo: (
                  <PartnersCard
                    size="sm"
                    imgDimentions={{ height: 100, width: 100 }}
                    hoverable
                    src="/imgs/partnerHeaderex2.svg"
                    classN={"logo-partner-img-sm"}
                  ></PartnersCard>
                ),
                description: "2005 BMW 5 Series 523i (e60)",
                note: title === "UPCOMING LIVE AUCTIONS" ? "" : "4200 km",
                fromPartener: true,
              }}
            ></ProductCardSmall>
          )}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default FeaturedProducts;
