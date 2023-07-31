import CustomInput from "@/components/CustomInput/CustomInput";
import WarningParagraph from "./WarningParagraph";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


const PricingInformation = ({ formState, setFormState, errors }) => {
    
    return (<Grid item padding={{ sm: 3 }}>
        <Typography fontWeight={700}>Pricing Information</Typography>
        <Typography fontWeight={600}>What’s your minimum acceptable price of the car?</Typography>
        <Typography fontWeight={400}>The starting bid for your auction will be 50% of your reserve
            price.</Typography>
        <TextField  
            error={ formState.reservedPrice==''}
            helperText={formState.reservedPrice==''?'Field is required':''}
            onChange={(e) => setFormState({ ...formState, reservedPrice: e.target.value })}
            label={'Reserve Price (SAR)'}
            type="number"
            pattern="[0-9]*"
            fullWidth
            variant="outlined" 
            margin="dense"
            />
        <WarningParagraph
            txt={'Note that the fees are inclusive of 15% VAT for private users and will apply the VAT for companies on the final price. Therefore, for companies you need to enter the amount including the VAT.'} />
        <Typography fontSize={14} fontWeight={600}>If you also want to set a fixed price for buyers to “buy now”,
            you can enter it below.</Typography>
        <TextField
            error={formState.vehiclePrice==''}
            helperText={formState.vehiclePrice==''?'Field is required':''}
            label={'Buy Now (SAR)'}
            onChange={(e) => setFormState({ ...formState, vehiclePrice: e.target.value })}
            type="number"
            pattern="[0-9]*"
            fullWidth
            variant="outlined"
            margin="dense"
        />
    </Grid>)
}

export default PricingInformation;