import ImageTextOverlay from "@/components/ImageTextOverlay/ImageTextOverlay";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import SliderBlock from "../SliderBlock/SliderBlock";
import { useDispatch } from "react-redux";
import { setC2CCategory } from "@/redux/slices/c2c.slice";
import { useTranslation } from "react-i18next";

const Categories = ({
  title,
  pageView,
  wrap,
  categoriesData,
  seeAll = true,
}) => {
  const dispatch = useDispatch();

  const handleSelectCat = (id) => {
    dispatch(setC2CCategory(id));
  };
  const { t, i18n } = useTranslation();

  const renderCategoriesImages = categoriesData.map(
    ({ imagePath, name, id, link }) => (
      <div key={id} style={{ width: 200, height: 200 }}>
        <Link
          onClick={() => handleSelectCat(id)}
          href={link || `/category/${id}`}
          style={{ marginRight: 12, marginBottom: 10 }}
        >
          <ImageTextOverlay image={imagePath} txt={name} />
        </Link>
      </div>
    )
  );
  const renderCategoriesImagesPage = categoriesData.map(
    ({ imagePath, name, id, link }) => (
      <Grid xs={6} p={1} key={id} style={{ width: 220, height: 110 }}>
        <Link
          onClick={() => handleSelectCat(id)}
          href={link || `/category/${id}`}
          style={{ marginRight: 12, marginBottom: 10 }}
        >
          <ImageTextOverlay image={imagePath} txt={name} />
        </Link>
      </Grid>
    )
  );
  return (
    <Grid
      container
      pb={0}
      boxSizing={"border-box"}
      flexWrap={"nowrap"}
      width={"100%"}
      display={"block"}
      sx={{ overflow: "hidden" }}
    >
      <Grid
        item
        flexWrap={"nowrap"}
        maxWidth={"100vw"}
        boxSizing={"border-box"}
      >
        <Grid
          container
          flexWrap="nowrap"
          maxWidth="100vw"
          boxSizing="border-box"
        >
          <Grid container flex alignItems="center" padding={3}>
            <Typography
              fontWeight={900}
              fontSize={20}
              color="rgb(226 232 240)"
              style={{ marginRight: 4 }}
              sx={{ textTransform: "uppercase" }}
            >
              {title}
            </Typography>
            <Grid item sx={{ marginLeft: "auto" }}>
              {!pageView && seeAll && (
                <Link
                  href="/category"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    color: "white",
                  }}
                >
                  <Grid container flex alignItems="center">
                    <Typography fontWeight={400} fontSize={12} color="white">
                      {t("common:home.see_all")}
                    </Typography>
                    <KeyboardArrowRightIcon
                      style={{ fontSize: 12, marginLeft: 2 }}
                    />
                  </Grid>
                </Link>
              )}
            </Grid>
          </Grid>
        </Grid>

        {!pageView && (
          <SliderBlock
            slideMaxWidth={300}
            spaceBetween={10}
            slidesPerView={"auto"}
            navigation={true}
          >
            {renderCategoriesImages}
          </SliderBlock>
        )}

        {pageView && <Grid container>{renderCategoriesImagesPage}</Grid>}
      </Grid>
    </Grid>
  );
};

export default Categories;
