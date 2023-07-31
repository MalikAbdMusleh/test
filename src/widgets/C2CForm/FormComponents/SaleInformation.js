import CustomInput from "@/components/CustomInput/CustomInput";
import WarningParagraph from "./WarningParagraph";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const SaleInformation = ({ formState, setFormState, errors }) => {
    return (
        <Grid item padding={{ sm: 3 }}>
            <Grid container flexDirection={'column'}>
                <Typography fontWeight={700}>Sale Information</Typography>
                <Typography fontWeight={600}>Set a fixed price for buyers to “buy now”.</Typography>
                <Grid item width={'100%'}>
                    <TextField
                        onChange={(e) => setFormState({ ...formState, vehiclePrice: e.target.value })}
                        helperText={formState.vehiclePrice==''?'Field is required':''}
                        label={'Price (SAR)'}
                        error={formState.vehiclePrice==''}
                        type="number"
                        pattern="[0-9]*"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                       
                    />
                </Grid>
                <WarningParagraph txt={'Note that the fees are inclusive of 15% VAT for private users and will apply the VAT for companies on the final price. Therefore, for companies you need to enter the amount including the VAT.'} />

            </Grid>
        </Grid>
    )
}

export default SaleInformation;