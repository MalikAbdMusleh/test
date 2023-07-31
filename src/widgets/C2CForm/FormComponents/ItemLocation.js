import CustomDialog from "@/components/CustomDialog/CustomDialog";
import { useGetCityByRegionQuery } from "@/redux/apis/locations/cities.api";
import { useGetCountriesQuery } from "@/redux/apis/locations/countries.api";
import { useGetRegionByCountryQuery } from "@/redux/apis/locations/regions.api";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useMemo, useEffect, useState } from "react";

const ItemLocation = ({
  value,
  setValue,
  label,
  country,
  regionState,
  city,
  formState
}) => {
  const libraries = useMemo(() => ["places"], []);
  const [lat, setLat] = useState(value?.lat || 24.7136);
  const [lng, setLng] = useState(value?.lng || 46.6753);
  const [isLocationSelected, setLocation] = useState(false);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [isRegionStateSelected, setIsRegionStateSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  const [geoLocaotion, setGeoLocation] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const getGeoLocaotion = () =>
    new Promise((res, rej) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
      )
        .then((result) => {
          res(result);
        })
        .catch((e) => {
          rej(e);
        });
    });

  useEffect(() => {
    getGeoLocaotion()
      .then((res) => res.json())
      .then((js) => {
        setGeoLocation(js?.plus_code?.compound_code);
      })
      .catch((e) => {
        console.log("##E", e);
      });
  }, [lng, lat]);

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    setLoaded(isLoaded);
  }, [isLoaded]);

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const getCountriesQuery = useGetCountriesQuery();
  const getRegionsQuery = useGetRegionByCountryQuery({ countryId: country });
  const getCitiesQuery = useGetCityByRegionQuery({ regionId: regionState });
  useEffect(() => {
    setCountries(getCountriesQuery?.data?.data);
  }, [getCountriesQuery]);

  useEffect(() => {
    setRegions(getRegionsQuery?.data?.data);
    setCities([]);
  }, [country, getRegionsQuery]);

  useEffect(() => {
    setCities(getCitiesQuery?.data?.data);
  }, [regionState, getCitiesQuery]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValue({ [name]: value, location: {} });
    setGeoLocation("");
    if (name=='countryId') {
      setValue({ regionId: '',cityId: '', location: {} });
      setSelectedValue((prevState)=>{return {...prevState, [name]: value,regionId: '',cityId: '', location: {} }})
     } else if (name=='regionId') {
      setValue({  cityId: '', location: {} });
      setSelectedValue((prevState)=>{return {...prevState, [name]: value,cityId: '', location: {} }})
     } else {
      
     }
    };
  return (
    <Grid item padding={{ sm: 3 }} py={{ xs: 3, sm: 0 }} width={"100%"}>
      <Grid container width={"100%"}>
        <Typography fontWeight={700} fontSize={19}>
          Item Location
        </Typography>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InputLabel>Country</InputLabel>
              <Select
                sx={{ width: "100%" }}
                name="countryId"
                label="Country"
                variant="outlined"
                onChange={handleInputChange}
                value={country}
              >
                {countries &&
                  countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
              {!country && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained muiltr-12bxhpu-MuiFormHelperText-root" id=":rf:-helper-text">Select Your Country Or Use The Map Below</p>}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InputLabel>Region</InputLabel>
              <Select
                sx={{ width: "100%" }}
                name="regionId"
                label="Region / State"
                variant="outlined"
                onChange={handleInputChange}
                disabled={!regions?.length}
                value={regionState}
              >
                {regions &&
                  regions.map((region) => (
                    <MenuItem key={region.id} value={region.id}>
                      {region.name}
                    </MenuItem>
                  ))}
              </Select>
              {!regionState?
               <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained muiltr-12bxhpu-MuiFormHelperText-root" id=":rf:-helper-text">
                Select Your Region Or Use The Map Below</p>:''}

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InputLabel>City</InputLabel>
              <Select
                sx={{ width: "100%" }}
                name="cityId"
                label="City"
                variant="outlined"
                onChange={handleInputChange}
                disabled={!cities?.length}
                value={city}
                
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
              </Select>
              {!city && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained muiltr-12bxhpu-MuiFormHelperText-root" id=":rf:-helper-text">Select Your City Or Use The Map Below</p>}

            </Grid>
          </Grid>
        </Grid>

        <Typography mt={3} fontWeight={600} fontSize={18}>
          {" "}
          OR
        </Typography>
        <Grid item width={"100%"}>
          <Button onClick={handleOpenDialog}>
            <Typography fontWeight={600} fontSize={14}>
              {" "}
              Select your location on the map
            </Typography>
          </Button>

          {geoLocaotion && isLocationSelected && (
            <>
              <Typography fontWeight={600}>Selected Location:</Typography>
              <Typography> {geoLocaotion}</Typography>
            </>
          )}
          <CustomDialog
            open={openDialog}
            title="Select location"
            handleClose={handleCloseDialog}
            component={
              loaded ? (
                <GoogleMap
                  options={mapOptions}
                  zoom={14}
                  mapTypeId={google.maps.MapTypeId.ROADMAP}
                  mapContainerStyle={{ width: "100%", height: "60vh" }}
                  onLoad={(map) => map.setCenter(mapCenter)}
                  onClick={(e) => {
                    console.log(e);
                    const lat = e.latLng.lat();
                    const lng = e.latLng.lng();
                    setLat(lat);
                    setLng(lng);
                  }}
                >
                  <MarkerF
                    position={mapCenter}
                    onLoad={() => console.log("Marker Loaded")}
                  />
                </GoogleMap>
              ) : (
                <p>Loading...</p>
              )
            }
            actions={
              <Box>
                <Button
                  onClick={() => {
                    setValue({
                      location: { label: geoLocaotion, lng: lng, lat: lat },
                      country: "",
                      regionState: "",
                      city: "",
                    });
                    setLocation(true);
                    handleCloseDialog();
                  }}
                >
                  Use Address
                </Button>
              </Box>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemLocation;
