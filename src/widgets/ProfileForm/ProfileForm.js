import CustomInput from "@/components/CustomInput/CustomInput";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RadioMenu from "@/widgets/RadioMenu/RadioMenu";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IOSSwitch from "@/components/IOSSwitch/IOSSwitch";
import FileUploadBtn from "@/components/FileUploadBtn/FileUploadBtn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Formik } from "formik";
import Link from "next/link";
import dayjs from "dayjs";
import { useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { useGetCountriesQuery } from "@/redux/apis/locations/countries.api";
import { useGetRegionByCountryQuery } from "@/redux/apis/locations/regions.api";
import { useGetCityByRegionQuery } from "@/redux/apis/locations/cities.api";
import { useEffect } from "react";
import CustomInputNumber from "@/components/CustomInputNumber/CustomInputNumber";

const ProfileForm = ({
  profileData,
  profile = false,
  sellerTypeOptions,
  genderOptions,
  handleUpdate,
  handleInputChange,
  onChangeDate,
  eighteenAgo,
  errors,
  getCountriesQuery,
  getRegionsQuery,
  getCitiesQuery,
  handleInputChangeNumber,
}) => {
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("/imgs/profpic.svg");

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(getCountriesQuery?.data?.data);
  }, [getCountriesQuery]);

  useEffect(() => {
    setRegions(getRegionsQuery?.data?.data);
    setCities([]);
  }, [profileData?.country, getRegionsQuery]);

  useEffect(() => {
    setCities(getCitiesQuery?.data?.data);
  }, [profileData?.regionState, getCitiesQuery]);

  const onUpload = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };
  return (
    <Formik onSubmit={handleUpdate}>
      {(props) => {
        return (
          <Grid
            container
            padding={{ sm: 3 }}
            spacing={4}
            pb={10}
            width={{ sm: "100%", lg: "80%", xl: "70%" }}
            margin={"auto"}
          >
            <Grid item xs={12} sm={6} margin={"auto"}>
              <Grid item xs={12}>
                <Grid
                  container
                  flex
                  flexDirection={"column"}
                  // alignItems={"center"}
                >
                  <Grid item pb={3} container alignItems="center">
                    <Grid item xs={12}>
                      <Link href={"/auth"} style={{ textDecoration: "none" }}>
                        <Grid container alignItems="center">
                          <ArrowBackIosIcon fontSize="small" color="primary" />
                          <Typography color="primary">Back</Typography>
                        </Grid>
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        width={"80%"}
                        variant="inherit"
                        fontWeight="bold"
                        textAlign={"center"}
                      >
                        Sign up
                      </Typography>
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      marginBottom: 10,
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    {imageSrc && (
                      <Image
                        alt="profile"
                        placeholder="empty"
                        width={120}
                        height={120}
                        src={imageSrc}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                <CustomInput
                  value={profileData.firstName}
                  name={"firstName"}
                  handleInputChange={handleInputChange}
                  label={"First Name"}
                  error={errors.firstName}
                  helperTxt={errors.firstName}
                  required
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                <CustomInput
                  value={profileData.lastName}
                  name={"lastName"}
                  handleInputChange={handleInputChange}
                  label={"Last Name"}
                  error={errors.lastName}
                  helperTxt={errors.lastName}
                  required
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} my={{ xs: 2 }}>
                <RadioMenu
                  value={profileData.gender}
                  handleChange={handleInputChange}
                  title={"Gender"}
                  options={genderOptions}
                  name={"gender"}
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                <InputLabel htmlFor="date-of-birth">Date of birth*</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    maxDate={eighteenAgo()}
                    sx={{ width: "100%" }}
                    id="date-of-birth"
                    format="DD/MM/YYYY"
                    defaultValue={eighteenAgo()}
                    onChange={(val) => onChangeDate(val)}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                <CustomInput
                  value={profileData.email}
                  name={"email"}
                  handleInputChange={handleInputChange}
                  label={"Email"}
                  error={errors.email}
                  helperTxt={errors.email}
                  required
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                <CustomInput
                  value={profileData.password}
                  name="password"
                  isPasswordField
                  handleInputChange={handleInputChange}
                  label={"Password"}
                  error={errors.password}
                  helperTxt={errors.password}
                  required
                />
                <Typography p={1} fontSize={"0.75rem"}>
                  Please use at least 8 characters, one number, one uppercase
                  letter, and one lowercase letter.
                </Typography>
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                {/* <CustomInput
                  value={profileData.mobile}
                  name={"mobile"}
                  handleInputChange={handleInputChange}
                  label={"Mobile phone number"}
                  error={errors.mobile}
                  prefix="+966"
                  helperTxt={errors.mobile}
                  required
                /> */}
                <CustomInputNumber
                  value={profileData.mobile}
                  name={"mobile"}
                  handleInputChange={handleInputChangeNumber}
                  label={"Mobile phone number"}
                  error={errors.mobile}
                  prefix="+966"
                  helperTxt={errors.mobile}
                  required
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10}>
                <CustomInput
                  value={profileData.address}
                  name={"address"}
                  handleInputChange={handleInputChange}
                  label={"Address"}
                  error={errors.address}
                  helperTxt={errors.address}
                  required
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} my={{ xs: 1 }}>
                <InputLabel sx={{ color: "white" }}>Country</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  name="country"
                  label="Country"
                  variant="outlined"
                  onChange={handleInputChange}
                  value={profileData.country}
                  error={errors.country}
                  inputProps={{ required: true }}
                >
                  {countries &&
                    countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error>{errors.country}</FormHelperText>
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} my={{ xs: 1 }}>
                <InputLabel sx={{ color: "white" }}>Region</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  name="regionState"
                  label="Region / State"
                  variant="outlined"
                  onChange={handleInputChange}
                  disabled={!regions?.length}
                  value={profileData.regionState}
                >
                  {regions &&
                    regions.map((region) => (
                      <MenuItem key={region.id} value={region.id}>
                        {region.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} my={{ xs: 1 }}>
                <InputLabel sx={{ color: "white" }}>City</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  name="city"
                  label="City"
                  variant="outlined"
                  onChange={handleInputChange}
                  disabled={!cities?.length}
                  value={profileData.city}
                >
                  {cities &&
                    cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} my={{ xs: 1 }}>
                <CustomInput
                  value={profileData.occupation || ""}
                  name={"occupation"}
                  helperTxt={""}
                  handleInputChange={handleInputChange}
                  label={"Occupation"}
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} my={2}>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: "dataSharingPermission",
                            value: Number(e.target.checked),
                          },
                        });
                      }}
                      sx={{ m: 1 }}
                      checked={!!profileData.dataSharingPermission}
                    />
                  }
                  label="Opt into communication with personal information"
                  labelPlacement="start"
                  value={!!profileData.dataSharingPermission}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} my={2} width={"100%"}>
                <FormControlLabel
                  sx={{ width: "97%" }}
                  control={
                    <IOSSwitch
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: "checkedTc",
                            value: Number(e.target.checked),
                          },
                        });
                      }}
                      sx={{ ml: "auto" }}
                      checked={!!profileData.checkedTc}
                    />
                  }
                  label="I Agree to Terms and Conditions"
                  labelPlacement="start"
                  value={!!profileData.checkedTc}
                />
              </Grid>

              <Grid item xs={10} sm={10} md={10} lg={10} mt={2}>
                <Button
                  onClick={handleUpdate}
                  style={{ width: "100%", height: 50, borderRadius: 25 }}
                  variant="outlined"
                >
                  {profile ? "Update" : "SignUp"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
