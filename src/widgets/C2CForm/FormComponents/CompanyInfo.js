import CustomInput from "@/components/CustomInput/CustomInput";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const CompanyInfo = ({ formState, setValue }) => {

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setValue({ [name]: value });
    };
    return (
        <Grid item padding={{ sm: 3 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                    helperText={formState.commercialRegistration == ''?'Field is required':'We need this info  to verify your company’s identity'}
                    label={'Company Reg Number'}
                    fullWidth
                    error={formState.commercialRegistration == ''}
                    variant="outlined"
                    margin="dense"
                    name='commercialRegistration'
                    onChange={handleInputChange}
                    type="number"
                    pattern="[0-9]*"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                {!(formState.sellerType === "companyNoVat") && <TextField
                    type="number"
                    pattern="[0-9]*"
                    fullWidth
                    error={formState.companyVatNo == ''}
                    variant="outlined"
                    margin="dense"
                    name='companyVatNo'
                    helperText={formState.companyVatNo == ''?'Field is required':'We need this info  to verify your company’s identity'}
                    label={'Company VAT Number'}
                    onChange={handleInputChange}
                />}

            </Grid>
        </Grid>
    )
}

export default CompanyInfo;