import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { onAddFilter } from "@/redux/slices/advanceSearch.slice";
import { useTranslation } from "react-i18next";

const ProductListHeader = ({
  title,
  titleLink = "/",
  seeAll = false,
  filter,
  isCategory,
  type,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const handleSeeAllClick = () => {
    if (isCategory) {
      dispatch(
        onAddFilter({
          saleType: type,
          auctionVehicleTypeId: filter.catId,
          type: filter.sortBy === "popular" ? "most-popular" : filter.sortBy,
        })
      );
      router.push("/search");
    } else router.push(titleLink);
  };
  return (
    <Grid container flex alignItems={"self-end"} padding={3}>
      <Typography
        color="secondary"
        fontWeight={900}
        fontSize={22}
        style={{ marginRight: 4, color: "white" }}
        sx={{ textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      {title?.toLowerCase() !== "featured" && (
        <Grid container flex onClick={handleSeeAllClick}>
          <Grid item marginLeft={"auto"} sx={{ cursor: "pointer" }}>
            <Typography fontWeight={400} fontSize={12} color="white">
              {t("common:home.see_all")}
            </Typography>
          </Grid>
          <Grid item alignItems={"center"}>
            <KeyboardArrowRightIcon style={{ fontSize: 12 }} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductListHeader;
