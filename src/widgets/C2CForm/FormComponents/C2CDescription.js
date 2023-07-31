import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const C2CDescription = ({ description, setFormState }) => {
    return (
        <>
            <Typography fontSize={'1.25rem'} fontWeight={700}>
                Write the description of the item
            </Typography>
            <Typography fontSize={'14px'} variant="body2">
                This is optional, however, the auction with a proper description usually attracts more potential buyers.
            </Typography>
            <TextField
                error={!description}
                helperText={description == ''?'Field is required':''}

                 value={description}
                placeholder="Description"
                multiline
                rows={10}
                sx={{ width: '100%', padding: {sm:1} }}
                onChange={(e) => { setFormState({ description: e.target.value }) }}
            />
        </>
    )
}


export default C2CDescription;