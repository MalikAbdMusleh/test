import C2CForm from "@/widgets/C2CForm/C2CForm";
import ImageUploader from "@/widgets/ImageUploader/ImageUploader";
import ProductList from "@/widgets/ProductList/ProductList";
import SliderBlock from "@/widgets/SliderBlock/SliderBlock";
import UploadFile from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdditionalFeatures from "../additional-features";
import CustomDialog from "@/components/CustomDialog/CustomDialog";
import PostCompleteSuccess from "../post-complete-success";
import { useRouter } from "next/router";
import PriceBreakdown from "../price-breakdown";
import { fetchApi } from "@/helpers/fetchApi";
import cookieCutter from "cookie-cutter";
import Cookies from "cookies";
import { resetFormState, setFormState } from "@/redux/slices/c2c.slice";
import { useStoreInspectionReportMutation } from "@/redux/apis/homeApi";

const C2CCategory = ({
  categoryId,
  auctionId,
  auctionDetails,
  vehicleMakes,
  locations,
}) => {
  const [file, setFile] = useState(
    auctionDetails?.mediaPhotos?.map((img) => img.url) || []
  );
  const [editMode, setEditMode] = useState(false);
  const { formState } = useSelector((state) => state.c2c);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(
    categoryId == "1" ? "report" : "success"
  );
  const [storeReportQ] = useStoreInspectionReportMutation();
  const imageMapper = auctionDetails?.mediaPhotos?.reduce((acc, img) => {
    acc[img.url] = img.id;
    return acc;
  }, {});

  const continueForm = async (e) => {
    setEditMode(true);
  };

  const onCreatAuction = async () => {
    let formDataApi = {};
    const mappings = [
      { key: "make", newKey: "vehicleMakeId", getValue: (value) => value?.id },
      {
        key: "model",
        newKey: "vehicleModelId",
        getValue: (value) => value?.id,
      },
      { key: "year", newKey: "vehicleYear", getValue: (value) => value?.id },
      { key: "companyVatNo", newKey: "companyVatNo" },
      {
        key: "exteriorColor",
        newKey: "vehicleColor",
        getValue: (value) => value?.id,
      },
      {
        key: "interiorColor",
        newKey: "insideColor",
        getValue: (value) => value?.id,
      },
      {
        key: "itemLocation",
        newKey: "countryId",
        getValue: (value) => value?.id,
      },
      { key: "km", newKey: "mileage", getValue: (value) => value?.id },
      { key: "reservePrice", newKey: "reservedPrice" },
      {
        key: "transmission",
        newKey: "vehicleTransmission",
        getValue: (value) => value?.id,
      },
    ];

    Object.entries(formState).forEach(([key, value]) => {
      let _key = key;
      let _value = value;

      const mapping = mappings.find((mapping) => mapping.key === key);
      if (mapping) {
        _key = mapping.newKey;
        _value = mapping.getValue ? mapping.getValue(value) : value;
      } else {
        if (typeof value === "object" && value !== null) {
          _value = value.label;
        }
      }

      formDataApi[_key] = _value;
    });
    if (formState.saleType === "auction" && !formDataApi["reservedPrice"])
      if (formState.saleType === "sale" && !formDataApi["vehiclePrice"])
        return alert("please fill vehicle price");

    formDataApi.auctionVehicleTypeId = categoryId;

    formState.title ? formState.title : delete formDataApi.title;
    const accessToken = cookieCutter.get("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };

    await fetchApi(
      {
        url: `auction-vehicles/${auctionId}`,
        method: "PATCH",
        data: formDataApi,
        headers,
      },
      true
    );
  };

  const storeInspectionReport = async () => {
    storeReportQ({ auctionId })
      .unwrap()
      .then((res) => {
        setReportData(res);
        setCheckoutMode("report");
        setCheckoutModalOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleFormContinue = async (open) => {
    await onCreatAuction();
    if (categoryId == "1") {
      await storeInspectionReport();
    } else {
      setCheckoutMode("success");
      setCheckoutModalOpen(open);
    }
  };
  const handleCheckout = (mode) => {
    setCheckoutMode(mode);
  };
  const router = useRouter();
  const [reportData, setReportData] = useState();
  const handleFinishWithdraw = async () => {
    router.push("/account");
  };

  const checkoutComponents = {
    report: (
      <AdditionalFeatures
        categoryId={categoryId}
        formState={formState}
        handleCheckout={handleCheckout}
        auctionId={auctionId}
        data={reportData?.length && reportData[0]}
      />
    ),
    success: (
      <PostCompleteSuccess handleFinishWithdraw={handleFinishWithdraw} />
    ),
    price: (
      <PriceBreakdown
        formState={formState}
        auctionId={auctionId}
        categoryId={categoryId}
        report={reportData?.length && reportData[0]}
        handleTopup={() => handleCheckout("success")}
      />
    ),
  };
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetFormState());
    };
  }, []);
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"center"}
      width={"100vw"}
      minWidth={"100%"}
      alignItems={"center"}
      overflow={"scroll"}
      wrap
      height={"100vh"}
      sx={{ display: "contents" }}
    >
      <Grid item xs={8} height={"100%"} margin={"auto"} mb={10}>
        {!editMode && (
          <Grid container flexDirection={"column"}>
            <Grid
              item
              textAlign={"center"}
              display={"flex"}
              flexDirection={"column"}
              py={3}
              xs={12}
            >
              <Typography
                fontWeight={800}
                color="primary"
                textTransform={"uppercase"}
              >
                upload photos
              </Typography>
              <Typography>
                Tip: Hold and drag to reorder images. Multiple uploads allowed.
              </Typography>
            </Grid>
            <Grid
              xs={12}
              item
              margin={"auto"}
              mb={2}
              flex
              alignItems={"center"}
              height={"100%"}
              maxWidth={"100vw"}
              width={{ xs: "90%", md: "100%", xl: "70%" }}
            >
              <Divider
                variant="middle"
                sx={{ borderColor: "#00F0A9" }}
                width={"100%"}
              />
              <Box py={3} height={"100%"}>
                <ImageUploader
                  file={file}
                  setFile={setFile}
                  upload={UploadFile}
                  imageMapping={imageMapper}
                  categoryId={categoryId}
                  auctionId={auctionId}
                  auctionDetails={auctionDetails}
                  vehicleMakes={vehicleMakes}
                  locations={locations}

                  
                />
              </Box>
            </Grid>
            {file.length > 0 && (
              <Grid xs={12} item textAlign={"center"}>
                <Button
                  onClick={continueForm}
                  sx={{
                    width: { xs: "100%", sm: "50%" },
                    height: 50,
                    borderRadius: 25,
                  }}
                  variant="outlined"
                >
                  Continue
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      {editMode && (
        <Grid item xs={12} margin="auto">
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <div style={{ width: "100%" }}>
              <SliderBlock
                slideMaxWidth={300}
                spaceBetween={60}
                slidesPerView={"auto"}
                navigation={true}
                className="c2c"
              >
                {file.map((file, i) => (
                  <Image
                    key={i}
                    src={file}
                    width={300}
                    height={200}
                    alt="asd"
                  />
                ))}
              </SliderBlock>
            </div>
            <C2CForm
              handleFormContinue={handleFormContinue}
              formState={formState}
              auctionId={auctionId}
              vehicleMakes={vehicleMakes}
              locations={locations}
              catId={router.query.category}
            />
          </Grid>
        </Grid>
      )}

      {checkoutModalOpen && (
        <CustomDialog
          open={checkoutModalOpen}
          handleClose={() => setCheckoutModalOpen(false)}
          component={checkoutComponents[checkoutMode]}
          title={"Inspection Report"}
        />
      )}
    </Grid>
  );
};

export default C2CCategory;

export const getServerSideProps = async ({ req, res, query }) => {
  const categoryId = query.category;
  try {
    console.log("##BFRRES");
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetchApi({
      url: `auction-vehicles/initialize?auctionVehicleTypeId=${categoryId}`,
      method: "POST",
      headers,
    });
    console.log("##rs", response);
    const auctionDetailsById = await fetchApi({
      url: `auction-vehicles/${response.auctionVehicleId}`,
      headers,
      // url: `auction-vehicles/313`
    });

    const vehicleMakes = await fetchApi({
      url: `vehicle-makes`,
      headers,
    });

    const locations = await fetchApi({
      url: `location/countries`,
      headers,
    });

    return {
      props: {
        categoryId: categoryId,
        auctionId: response.auctionVehicleId,
        auctionDetails: auctionDetailsById,
        vehicleMakes: vehicleMakes.data,
        locations: locations.data,
      },
    };
  } catch (error) {
    console.error("Error:", error.message);

    return {
      props: {
        error: error.message,
      },
    };
  }
};
