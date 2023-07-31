import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import {
    Alert,
    Box,
    Button,
    Grid,
    Popover,
    Snackbar,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import Image from "next/image";
import profileStyles from "@/components/Profile/profile.module.css";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Link from "next/link";
import { useUpdateProfileMutation } from "@/redux/apis/profile.api.js";
import { useDeleteProfileMutation } from "@/redux/apis/profile.api.js";
import dayjs from "dayjs";
import { useGetCountriesQuery } from "@/redux/apis/locations/countries.api";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useGetRegionByCityQuery, useGetRegionByCountryQuery } from "@/redux/apis/locations/regions.api";
import { useGetCityByRegionQuery } from "@/redux/apis/locations/cities.api";
import { useGetProfileQuery } from "@/redux/apis/profile.api";
import InputLabel from "@mui/material/InputLabel";
import { checkPhoneNumber } from "@/lib/helpers";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"; 

export default function NewProfile(props) {

    const imageRef = useRef(null);
    const [profileState, setProfileState] = useState({
        firstName: '',
        lastName: '',
        city: '',
        address: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        mobile: '',
        country: '',
        state: '',
        cityId: '',
        occupation: '',
        seller: '',
        commercialRegistration: '',
        companyVatNo: '',
    });
    const [imageSrc, setImageSrc] = useState("/imgs/profpic.svg");
    const [openPopover, setOpenPopover] = useState(null);
    const [anchorEl, setanchorEl] = useState(null);
    const [error, setError] = useState({});

    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const router = useRouter();

    const openPopOver = (htmlEle) => {
        setanchorEl(htmlEle);
        setOpenPopover(true);
    };
    const [init, setInit] = useState(true);
    const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();
    const getProfileQuery = useGetProfileQuery({}, { skip: init });
    const getCountriesQuery = useGetCountriesQuery()
    const getRegionsQuery = useGetRegionByCountryQuery({ countryId: profileState?.country });
    const getCitiesQuery = useGetCityByRegionQuery({ regionId: profileState?.state })
    const [updateProfile, { isSuccess }] = useUpdateProfileMutation();

    useEffect(() => {
        setInit(false)
    }, [])
    useEffect(() => {
        if (getProfileQuery?.data)
            setProfileState(getProfileQuery?.data);
    }, [getProfileQuery]);

    useEffect(() => {
        setCountries(getCountriesQuery?.data?.data);
    }, [getCountriesQuery]);

    useEffect(() => {
        setRegions(getRegionsQuery?.data?.data);
        setCities([]);
    }, [profileState?.country, getRegionsQuery]);

    useEffect(() => {
        setCities(getCitiesQuery?.data?.data);
    }, [profileState?.state, getCitiesQuery])

    const onUpload = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setImageSrc(reader.result);
        };
    };


    function eighteenAgo() {
        var date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return dayjs(date);
    }

    const handleProfileUpdate = () => {
        let validated = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'mobile', 'address']
        requiredFields.forEach(field => {
            if (!profileState[field]) {
                setError(prevState => ({ ...prevState, [field]: 'Field is required.' }))
                validated = validated && false;
            } else setError(prevState => ({ ...prevState, [field]: '' }))
        })
        if (!checkPhoneNumber(profileState.mobile)) {
            setError(prevState => ({ ...prevState, mobile: 'Invalid Phone number' }))
            validated = validated && false;
        } else setError(prevState => ({ ...prevState, mobile: '' }))

        console.log(error);
        if (validated)
            updateProfile({
                firstName: profileState.firstName,
                lastName: profileState.lastName,
                city: profileState.city,
                address: profileState.address,
                email: profileState.email,
                dateOfBirth: profileState.dateOfBirth,
                gender: profileState.gender,
                mobile: profileState.mobile,
                country: profileState.country,
                state: profileState.state,
                cityId: profileState.cityId,
                occupation: profileState.occupation,
                commercialRegistration: profileState.commercialRegistration,
                companyVatNo: profileState.companyVatNo,
            }).unwrap()
                .then(res => {
                    router.replace('/profile')
                })
                .catch(e => {
                    setSnackbarState(state => ({
                        type: 'error',
                        open: true,
                        message: e.data.payload.validation[0].errors[0].message
                    }))
                })
    };

    const handleInputChange = (e) => setProfileState(state => ({ ...state, [e.target.name]: e.target.value }))
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        type: 'error'
    });

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
        <Grid container padding={3} spacing={4} pb={10} width={{ sm: '100%', lg: '80%', xl: '70%' }}
            margin={{ lg: 'auto' }}>
            <Grid item xs={12} sm={6} margin={'auto'}>
                <Grid container flexDirection={'column'}>
                    <Grid item>
                        <Box justifyContent={"center"} alignItems={"center"} flexDirection={"column"} display={"flex"}>
                            <input
                                name="image"
                                ref={imageRef}
                                type="file"
                                hidden
                                onChange={(e) => {
                                    setImageSrc("image", e.target.files[0]);
                                    onUpload(e.target.files[0]);
                                }}
                            ></input>

                            {imageSrc && (
                                <Image
                                    alt="profile"
                                    placeholder="empty"
                                    width={120}
                                    height={120}
                                    className={`${profileStyles["rounded-img"]} ${profileStyles["responsive-img"]}`}
                                    src={imageSrc}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item py={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} py={1}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    onChange={handleInputChange}
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    value={profileState.firstName}
                                    error={error.firstName}
                                    helperText={error.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} py={1}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    onChange={handleInputChange}
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    value={profileState.lastName}
                                    error={error.lastName}
                                    helperText={error.lastName}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box className={profileStyles["border-raduis-12"]} my={2}>
                            <Box
                                className={`${profileStyles["dark-grey-background"]} ${profileStyles["border-radius-top"]}`}
                                p={2}>
                                <p className={`${profileStyles["margin-zero"]} ${profileStyles["bold"]}`}>Gender</p>
                            </Box>
                            <Box
                                px={2}
                                onClick={() => handleInputChange({ target: { name: 'gender', value: 'm' } })}
                                display={"flex"}
                                className={profileStyles["grey-border-bottom"]}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <p className={`${profileStyles["bold"]}`}>Male</p>
                                <input
                                    name="gender"
                                    type="checkbox"
                                    className={profileStyles["rounder-checkbox"]}
                                    checked={profileState.gender === "m"}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box
                                px={2}
                                onClick={() => handleInputChange({ target: { name: 'gender', value: 'f' } })}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <p className={`${profileStyles["bold"]}`}>Female</p>
                                <input
                                    name="gender"
                                    className={profileStyles["rounder-checkbox"]}
                                    type="checkbox"
                                    checked={profileState.gender === "f"}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            flexDirection={'column'}
                            my={2}
                        >
                            <InputLabel sx={{ fontSize: 14 }} htmlFor="date-of-birth">Date of birth*</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    maxDate={eighteenAgo()}
                                    defaultValue={eighteenAgo()}
                                    sx={{ width: "100%" }}
                                    id="date-of-birth"
                                    format="YYYY-MM-DD"
                                    onChange={(e) => {
                                        handleInputChange({
                                            target: { name: 'dateOfBirth', value: dayjs(e).format('YYYY-MM-DD') }
                                        })
                                    }}
                                    value={dayjs(profileState.dateOfBirth)}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={12} py={1}>
                        <TextField
                            sx={{ width: '100%' }}
                            onChange={handleInputChange}
                            name="email"
                            label="Email Address"
                            variant="outlined"
                            value={profileState.email}
                            error={error.email}
                            helperText={error.email}
                        />
                    </Grid>
                    <Grid item xs={12} py={1}>
                        <TextField
                            sx={{ width: '100%' }}
                            onChange={handleInputChange}
                            name="mobile"
                            label="Mobile Phone Number"
                            variant="outlined"
                            value={profileState.mobile}
                            type="tel"
                            error={error.mobile}
                            helperText={error.mobile}
                        />
                    </Grid>
                    <Grid item xs={12} py={1}>
                        <TextField
                            sx={{ width: '100%' }}
                            onChange={handleInputChange}
                            name="occupation"
                            label="Occupation"
                            variant="outlined"
                            value={profileState.occupation}
                        />
                    </Grid>
                    <Grid item xs={12} py={1}>
                        <TextField
                            sx={{ width: '100%' }}
                            onChange={handleInputChange}
                            name="address"
                            label="Address"
                            variant="outlined"
                            value={profileState.address}
                            error={error.address}
                            helperText={error.address}
                        />
                    </Grid>

                    <Grid item xs={12} py={1}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            name="country"
                            label="Country"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={profileState.country}
                        >
                            {
                                countries && countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    { countries &&countries.length>0 &&<Grid item xs={12} py={1}>
                        <InputLabel>Region</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            name="state"
                            label="Region / State"
                            variant="outlined"
                            onChange={handleInputChange}
                            disabled={!regions?.length}
                            value={profileState.state}
                        >
                            {
                                regions && regions.map((region) => (
                                    <MenuItem key={region.id} value={region.id}>
                                        {region.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>


                    </Grid>}
                    {countries &&countries.length>0&&regions &&regions.length>0 &&<Grid item xs={12} py={1}>
                        <InputLabel>City</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            name="city"
                            label="City"
                            variant="outlined"
                            onChange={handleInputChange}
                            disabled={!cities?.length}
                            value={profileState.city}
                        >
                            {
                                cities && cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>


                    </Grid>}
                    <Grid item xs={12} py={1}>
                        {profileState.seller === "companyRepresentative" && (
                            <TextField
                                sx={{ width: '100%' }}
                                onChange={handleInputChange}
                                name="companyVatNo"
                                label="Company VAT Number"
                                variant="outlined"
                                value={profileState.companyVatNo}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} py={1}>
                        {profileState.seller === "companyRepresentative" && (

                            <TextField
                                sx={{ width: '100%' }}
                                onChange={handleInputChange}
                                name="commercialRegistration"
                                label="Company Registration Number"
                                variant="outlined"
                                value={profileState.commercialRegistration}
                            />
                        )}
                    </Grid>
                </Grid>
                <Button
                    variant="outlined"
                    className={profileStyles["btn"]}
                    style={{ width: '100%' }}
                    onClick={handleProfileUpdate}
                >
                    Save
                </Button>

            </Grid>
            <Snackbar
                open={snackbarState.open}
                onClose={() => setSnackbarState(state => ({ ...state, open: false }))}
                autoHideDuration={2000}
            >
                <Alert severity={snackbarState.type}>{snackbarState.message}</Alert>
            </Snackbar>
        </Grid>
        </>
    )
}