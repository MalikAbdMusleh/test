import { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RadioMenu from "@/widgets/RadioMenu/RadioMenu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Payment({
  addressOption,
  setAddressOption,
  id,
  addresses,
}) {
  const [formState, setFormState] = useState({
    deliveryOption: "delivery",
  });

  const handleSelectAddress = (val) => {
    let add = addresses.find((el) => el.address === val.target.value);
    console.log(add);
    setAddressOption(add);
  };

  return (
    <Grid
      container
      sx={{ p: 3 }}
      height={"auto"}
      margin="auto"
      width={{ xs: "100%", md: "70%" }}
    >
      <Grid item xs={12}>
        <Grid container flexDirection="column" alignItems="center" width="100%">
          <Grid item>
            <Typography variant="inherit" fontWeight="bold">
              Delivery Options
            </Typography>
          </Grid>
          <Grid item marginTop={3} xs={12} width={"100%"}>
            <RadioMenu
              name="deliveryOption"
              value={formState.deliveryOption}
              title="How would you like to receive your item?"
              setValue={setFormState}
              width={{ xs: "100%" }}
              options={[
                // {
                //   val: "delivery",
                //   label: "Delivery",
                //   subLabel: "Fee based on location",
                //   extras: {
                //     value: addressOption?.val,
                //     name: "addressOptions",
                //     handleChange: handleSelectAddress,
                //     addresses: addresses,
                //     links: (
                //       <Link
                //         href={`/add-address?id=${id}`}
                //         style={{ textDecorationColor: "#00f0a9" }}
                //       >
                //         <Grid
                //           container
                //           wrap="nowrap"
                //           direction="row"
                //           alignItems="center"
                //         >
                //           <Typography
                //             textTransform="none"
                //             color="primary"
                //             fontSize={15}
                //           >
                //             Add new delivery address
                //           </Typography>
                //           <ArrowForwardIosIcon
                //             fontSize="small"
                //             color="primary"
                //           />
                //         </Grid>
                //       </Link>
                //     ),
                //   },
                // },
                {
                  val: "pickup",
                  label: "Pick up",
                  subLabel: "Free of charge",
                  handleChange: handleSelectAddress,
                },
              ]}
            />
          </Grid>
          <Grid item margin={2} mt={4} xs={12} width="100%">
            <Typography color="#ffffffCC" textAlign="center" fontSize={14}>
              After payment we will contact you to let you complete the process.{" "}
              <br /> Please see our{" "}
              <Link
                href={"/terms-and-conditions"}
                style={{ color: "white" }}
                rel="noopener noreferrer"
                target="_blank"
              >
                <b>{"T&C's"}</b>
              </Link>{" "}
              for more info.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid item width="100%" container justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: { xs: "100%"} }}
        >
          Continue to payment
        </Button>
      </Grid> */}
    </Grid>
  );
}
