import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { useTheme } from "@emotion/react";
import { IconButton, Stack, useMediaQuery } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function generateCustomID() {
  const id = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
  return id.toString();
}
export default function SliderBlock({
  children,
  slidesPerView,
  slideWidth,
  slideMaxWidth,
  navigation = true,
  spaceBetween = 10,
  pagination = false,
  className,
}) {
  const [swiperState, setSwiperState] = useState({
    slidePerView: slidesPerView,
    navigation: navigation,
    spaceBetween,
    rid: null,
    swiperInstance: null,
  });
  const swiperRef = useRef();
  const slides = children?.map((slide, i) => (
    <SwiperSlide
      style={{
        width: slideWidth ? `${slideWidth}px` : "auto",
        maxWidth: slideMaxWidth ? `${slideMaxWidth}px` : undefined,
      }}
      key={i}
    >
      {slide}
    </SwiperSlide>
  ));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) {
      setSwiperState((state) => ({
        slidePerView: slidesPerView === "auto" ? "auto" : 1,
        navigation: navigation && false,
      }));
    }
  }, [isMobile, slidesPerView]);

  useEffect(() => {
    setSwiperState((prevState) => ({ ...prevState, rid: generateCustomID() }));
  }, []);
  const paginations = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" style=""></span>';
    },
  };
  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      paddingX={"0px"}
      width="100%"
    >
      <Swiper
        dir="ltr"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        allowSlideNext
        allowSlidePrev
        slidesPerView={swiperState.slidePerView}
        spaceBetween={spaceBetween}
        navigation={!isMobile}
        modules={[Navigation, Pagination]}
        className={`mySwiper w-100 ${className}`}
        centeredSlides={false}
        pagination={pagination && paginations}
      >
        {slides}
      </Swiper>
    </Stack>
  );
}
