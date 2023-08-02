import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IOSSwitch from "@/components/IOSSwitch/IOSSwitch";
import WarningParagraph from "./WarningParagraph";
import Link from "next/link";

const TermsAndConditions = ({ read, setRead, errors }) => {
    return (
        <Grid item padding={{ sm: 3 }}>
            <Grid container flexDirection={'column'}>
                <Typography fontWeight={700} fontSize={19}>Terms and Conditions</Typography>
                <Grid item>
                    <Grid container justifyContent={'space-between'}>
                        <Typography fontWeight={600} fontSize={12}>I have read and agreed to the <Link href={"/terms-and-conditions"}><Typography variant="caption" fontWeight={600} fontSize={12} color='primary'>Terms and Conditions</Typography></Link></Typography>
                        <FormControlLabel
                            control={
                                <IOSSwitch
                                    onChange={(e) => setRead(e.target.checked)}
                                    checked={read}
                                    sx={{ m: 1 }}
                                />
                            }
                            label=""
                            labelPlacement="start"
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <WarningParagraph txt={'You will be charged a fee of 1% of the final bid price when your auction is successful.'} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TermsAndConditions;