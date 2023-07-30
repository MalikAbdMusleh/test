import { genderOptions, sellerTypeOptions } from "@/contstants";
import CustomDialog from "@/components/CustomDialog";
import { useUpdateProfileMutation } from "@/redux/apis/profile.api";
import ProfileForm from "@/widgets/ProfileForm/ProfileForm";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  useEmailVerificationMutation,
  useRegisterMutation,
} from "@/redux/apis/authApi";
import { setAuth } from "@/redux/slices/auth.slice";
import { checkIfNumber, checkPhoneNumber } from "@/lib/helpers";
import { useGetCountriesQuery } from "@/redux/apis/locations/countries.api";
import { useGetRegionByCountryQuery } from "@/redux/apis/locations/regions.api";
import { useGetCityByRegionQuery } from "@/redux/apis/locations/cities.api";

export default function Profile(props) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
    dateOfBirth: eighteenAgo().format("YYYY-MM-DD"),
    gender: "m",
    address: "",
    city: "",
    regionState: "",
    country: "",
    occupation: "",
    favouriteBankId: 1,
    dataSharingPermission: 0,
  });

  const getCountriesQuery = useGetCountriesQuery();
  const getRegionsQuery = useGetRegionByCountryQuery({
    countryId: profileData?.country,
  });
  const getCitiesQuery = useGetCityByRegionQuery({
    regionId: profileData?.regionState,
  });

  const dispatch = useDispatch();
  const [registerQ, registerResponse] = useRegisterMutation();
  const [usrVerQ, userVerRes] = useEmailVerificationMutation();

  const handleSubmit = () => {
    let validated = true;
    const mobileRegex = /^\d{9,}$/; // Regex to match mobile number with 9 or more digits

    Object.keys(profileData).forEach((key) => {
      if (
        !profileData[key] &&
        ![
          "occupation",
          "dateOfBirth",
          "city",
          "regionState",
          "dataSharingPermission",
        ].includes(key)
      ) {
        setErrors((prevState) => ({
          ...prevState,
          [key]: "Field is required",
        }));
        validated = validated && false;
      } else {
        setErrors((prevState) => ({ ...prevState, [key]: "" }));
        validated = validated && true;
      }
    });
    // if (!checkPhoneNumber(profileData.mobile)) {
    //   setErrors(prevState => ({ ...prevState, mobile: 'Invalid phone number.' }))
    //   validated = validated && false;
    // }
    if (profileData.mobile.length !== 9) {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "Mobile number must have exactly 9 digits.",
      }));
      validated = false;
    }
    if (validated && !profileData.checkedTc) {
      alert("You must accept the terms and conditions");
      return;
    }
    const updatedData = { ...profileData };
    updatedData.country = getCountriesQuery?.data?.data?.find(
      (el) => el.id === updatedData.country
    )?.countryCode;
    console.log(errors);
    if (validated)
      registerQ(updatedData)
        .unwrap()
        .then((res) => {
          dispatch(setAuth(res));
          usrVerQ(res?.user?.id);
          router.replace("/");
        })
        .catch((err) => {
          let errMsg =
            err?.data?.message +
            ":\n" +
            (err?.data?.payload?.validation
              ? err?.data?.payload?.validation[0]?.errors[0]?.message
              : "");
          if (!errMsg) errMsg = "Something went wrong";
          setErrorMessage(errMsg);
          setOpenDialog(true);
        });
  };
  function eighteenAgo() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return dayjs(date);
  }

  const handleInputChange = (e) => {
    setProfileData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleInputChangeNumber = (e) => {
    setProfileData((state) => ({ ...state, mobile: e.target.value }));
  };

  const onChangeDate = (val) => {
    setProfileData((state) => ({
      ...state,
      dateOfBirth: dayjs(val).format("YYYY-MM-DD"),
    }));
  };
  console.log(profileData);
  return (
    <>
      <CustomDialog
        title={"Error"}
        message={errorMessage}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <ProfileForm
        onChangeDate={onChangeDate}
        profileData={profileData}
        handleUpdate={handleSubmit}
        genderOptions={genderOptions}
        handleInputChange={handleInputChange}
        handleInputChangeNumber={handleInputChangeNumber}
        sellerTypeOptions={sellerTypeOptions}
        eighteenAgo={eighteenAgo}
        errors={errors}
        getCountriesQuery={getCountriesQuery}
        getRegionsQuery={getRegionsQuery}
        getCitiesQuery={getCitiesQuery}
      />
    </>
  );
}
