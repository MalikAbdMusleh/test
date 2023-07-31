import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IOSSwitch from "@/components/IOSSwitch/IOSSwitch";
import WarningParagraph from "./WarningParagraph";
import React, { useState } from "react";

function RadioOffer({ offer, setoffer, errors, setValue, formState }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValue({ [name]: value });
  };
  return (
    <Grid item padding={{ sm: 3 }}>
      <Grid container flexDirection={"column"}>
        <Typography fontWeight={700} fontSize={19}>
          Sale Information
        </Typography>
        <Grid item>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            py={2}
          >
            <Typography fontWeight={600} fontSize={16}>
              open offer
            </Typography>
            <FormControlLabel
              control={
                <IOSSwitch
                  onChange={(e) =>{ setValue({ canAcceptOffers: !isChecked});setIsChecked(!isChecked)}}
                   checked={isChecked}
                  sx={{ m: 1 }}
                />
              }
              label=""
              labelPlacement="start"
            />
          </Grid>
        </Grid>
        <Grid item>
          <WarningParagraph
            txt={
              "enabling offers will allow potential buyers to make their own cash offers to buy you listed item."
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RadioOffer;
