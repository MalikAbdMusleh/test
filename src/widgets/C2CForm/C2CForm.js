import CustomAutocomplete from "@/components/CustomAutocomplete/CustomAutocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { detailsFields } from "./FormFields";
import RadioMenu from "../RadioMenu/RadioMenu";
import RadioButtons from "@/components/RadioGroup/RadioGroup";
import ItemLocation from "./FormComponents/ItemLocation";
import TermsAndConditions from "./FormComponents/TermsAndConditions";
import PricingInformation from "./FormComponents/PricingInformation";
import SaleType from "./FormComponents/SaleType";
import C2CDescription from "./FormComponents/C2CDescription";
import CompanyInfo from "./FormComponents/CompanyInfo";
import SaleInformation from "./FormComponents/SaleInformation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setFormState } from "@/redux/slices/c2c.slice";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { checkIfNumber } from "@/lib/helpers";
import RadioOffer from "./FormComponents/RadioOffer";

const C2CForm = ({ formState, handleFormContinue, locations, catId }) => {
  const [models, setModels] = useState([]);
  const [submited, setSubmited] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleContinue = () => {
    if (!formValid(formState)) {
      console.log(errors);
      return;
    }
    if (formValid(formState) && !readTC) {
      alert("You must accept terms and conditions");
      return;
    }
    if (!((formState.countryId && formState.regionId && formState.cityId) || formState.location.lat != undefined)) {
      alert("You must Add your location or your full address ! ");
      return;
    }
    handleFormContinue(true);
  };
  const {
    vehicleMakes,
    colors,
    mileages,
    years,
    transmissions,
    fuelTypes,
    cylinders,
    conditions,
    sellerTypes,
  } = useSelector((state) => state.auth.configs);
  const [readTC, setReadTC] = useState(false);
  const [offerTC, setOfferTC] = useState(false);
  const [errors, setErrors] = useState({});
  const formValid = (values) => {
    setSubmited(true)
    // check if all the required fields are filled start
    //for cars
    if (catId == '1') {
      if (!((formState.make &&
        formState.model &&
        formState.km &&
        formState.fuelType &&
        formState.transmission &&
        formState.interiorColor &&
        formState.exteriorColor &&
        formState.condition &&
        formState.vehiclePrice &&
        formState.description &&
        formState.cylinders))) {
        return;
      }
    }
    //for the rest of the categories
    if (catId != '1') {
      if (!(
        formState.vehiclePrice &&
        formState.description &&
        formState.title &&
        formState.sellerType)) {
        return false;
      }
    }

    if (formState.saleType == "auction") {
      if (!formState.reservePrice) {
        return false;
      }
    }
    if (formState.sellerType == "companyWithVat" || formState.sellerType == "governmentOrganisation") {
      if (!formState.commercialRegistration || !formState.commercialRegistration) {
        return false
      }
    }
    if (formState.sellerType == "companyNoVat") {
      if (!formState.commercialRegistration) {
        return false
      }
    }

    // check if all the required fields are filled end
    return true ;
  };

  detailsFields.map((field) => {
    switch (field.name) {
      case "make":
        field.options = vehicleMakes?.map((option) => {
          return { name: option.name, label: option.name, id: option.id };
        });
        break;
      case "model":
        field.options = models;
        return field;
      case "km":
        field.options = mileages?.map((option) => {
          return { name: option.name, label: option.name, id: option.id };
        });
        break;
      case "year":
        field.options = years?.map((option) => {
          return { name: option.name, label: option.name, id: option.id };
        });
        break;
      case "transmission":
        field.options = transmissions?.map((option) => {
          return { name: option.name, label: option.name, id: option.id };
        });
        break;
      case "fuelType":
        field.options = fuelTypes?.map((option) => {
          return { name: option.name, label: option.name, id: option.id };
        });
        break;
      case "cylinders":
        field.options = cylinders?.map((option) => {
          return { name: option.name, label: option.name, id: option.id };
        });
        break;
      default:
        return field;
    }
    if (!["make", "model"].includes(field.name)) return field;
  });
  const renderDetailsFields = detailsFields.map(({ name, label, options }) => (
    <CustomAutocomplete
      name={name}
      value={formState[name]}
      setValue={(payload) => dispatch(setFormState(payload))}
      label={label}
      data={name === "year" ? options?.reverse() : options}
      sx={{ width: "100%", marginBottom: "1%" }}
      setModels={setModels}
      key={name}
    />
  ));

  const extraInfoFields = [
    { name: "interiorColor", label: "Interior Color", options: colors },
    { name: "exteriorColor", label: "Exterior Color", options: colors },
  ];
  const renderExtraInfoFields = extraInfoFields.map(
    ({ name, label, options }) => (
      <CustomAutocomplete
        name={name}
        value={formState[name]}
        setValue={(payload) => dispatch(setFormState(payload))}
        label={label}
        data={options}
        sx={{ width: "100%", marginBottom: "1%" }}
        key={name}
      />
    )
  );

  const handleSaletypeChange = (payload) => {
    setErrors((prevState) => ({
      ...prevState,
      reservedPrice: "",
      vehiclePrice: "",
      buyNowPrice: "",
    }));
    dispatch(
      setFormState({
        ...payload,
        reservedPrice: "",
        vehiclePrice: "",
        buyNowPrice: "",
      })
    );
  };
  return (
    <Grid
      container
      padding={{ xs: 3 }}
      width={{ xs: "100%", sm: "90%", md: "87%" }}
      margin={{ lg: "auto" }}
      spacing={{ sm: 3 }}
    >
      <Grid item xs={12} sm={6} margin={"auto"}>
        <Grid container flexDirection={"column"}>
          {catId == "1" && (
            <>
              <Grid item py={2} width={"100%"}>
                <Grid container spacing={2}>
                  <Typography fontSize={"1.25rem"} fontWeight={700}>
                    Vehicles Details
                  </Typography>
                  {renderDetailsFields}
                </Grid>
              </Grid>
              <Grid item py={2} my={2}>
                <Grid container spacing={2}>
                  <Typography fontSize={"1.25rem"} fontWeight={700}>
                    Extra Information
                  </Typography>
                  {renderExtraInfoFields}
                </Grid>
              </Grid>
              <Grid item py={2} my={2}>
                <Grid container spacing={2}>
                  <RadioButtons
                    value={formState.condition}
                    setValue={(payload) => dispatch(setFormState(payload))}
                    label={"Condition"}
                    options={conditions.map((condition) => ({
                      label: condition.name,
                      value: condition.id,
                    }))}
                  />
                  {!formState.condition && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained muiltr-12bxhpu-MuiFormHelperText-root" id=":rf:-helper-text">required</p>}

                </Grid>
              </Grid>
            </>
          )}
          {catId !== "1" && (
            <TextField
              label="Auction Title"
              value={formState.title}
              onChange={(e) =>
                dispatch(setFormState({ title: e.target.value }))
              }
              error={formState.title == ''}
              helperText={formState.title == '' ? 'Field is required' : ''}
            />
          )}

          <Grid item my={2} position={"relative"}>
            <Grid container>
              <C2CDescription
                description={formState.description}
                setFormState={(payload) => dispatch(setFormState(payload))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid cotaniner flexDirection={"column"}>
          <SaleType
            saleType={formState.saleType}
            handleSaleTypeChange={(payload) => handleSaletypeChange(payload)}
          />
          <RadioOffer errors={errors} offer={offerTC} setoffer={setOfferTC} formState={formState}


            setValue={(payload) => dispatch(setFormState(payload))}

          />
          <Grid
            item
            padding={{ sm: 3 }}
            maxWidth={"100vw"}
            xs={12}
            minWidth={"100%"}
          >
            <RadioMenu
              width={{ xs: "100%", sm: "100%", md: "100%" }}
              title={"Confirm Seller Type"}
              name={"sellerType"}
              value={formState.sellerType}
              setValue={(payload) => dispatch(setFormState(payload))}
              options={sellerTypes.map((condition) => ({
                label: condition.name,
                value: condition.id,
                val: condition.id,
              }))}
            />
            {!formState.sellerType && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained muiltr-12bxhpu-MuiFormHelperText-root" id=":rf:-helper-text">
              Select Your Seller Type</p>}
          </Grid>
          {(formState.sellerType === "companyWithVat" ||
            formState.sellerType === "governmentOrganisation" ||
            formState.sellerType === "companyNoVat")
            && <CompanyInfo formState={formState}
              setValue={(payload) => dispatch(setFormState(payload))}
            />}
          {formState.saleType === "sale" && (
            <SaleInformation
              setFormState={(payload) => dispatch(setFormState(payload))}
              formState={formState}
              errors={errors}
            />
          )}
          {formState.saleType === "auction" && (
            <PricingInformation
              setFormState={(payload) => dispatch(setFormState(payload))}
              formState={formState}
              errors={errors}
            />
          )}
          <ItemLocation
            value={formState.itemLocation}
            formState={formState.itemLocation}
            setValue={(payload) => {
              dispatch(setFormState(payload));
            }}
            country={formState.countryId}
            regionState={formState.regionId}
            city={formState.cityId}
          />
          <TermsAndConditions
            errors={errors}
            read={readTC}
            setRead={setReadTC}
          />
        </Grid>
        {submited && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained muiltr-12bxhpu-MuiFormHelperText-root" id=":rf:-helper-text">Please complete all required fields first</p>}

        <Button
          variant="outlined"
          style={{ width: "100%" }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default C2CForm;
