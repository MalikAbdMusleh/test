import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const ImageTextOverlay = ({ image, txt }) => {
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        fill
        sizes="(min-width: 320px) 200px"
        src={image}
        alt={`Category-${txt}-img`}
        style={{ borderRadius: "7%" }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            i18n.dir() == "rtl"
              ? ""
              : "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 74.71%);",
          borderRadius: "7%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          color: "white",
          paddingLeft: "18px",
          paddingBottom: "13px",
          textAlign: "left",
        }}
      >
        <Typography
          fontSize={{ xs: "60%", sm: "1rem" }}
          fontWeight={900}
          sx={{ textTransform: "uppercase" }}
        >
          {txt}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageTextOverlay;
