import { Box, TextField, Typography } from "@mui/material";

export default function TopupValue({
  value,
  onChange,
  action,
  hasError,
  minimumBid,
  snackbarState,
  setHasError,
  setButtonDisabel,
}) {
  const handleOnChange = (event) => {
    const newValue = event.target.value;
    setHasError(newValue < minimumBid); // Update hasError based on the validation result
    setButtonDisabel(newValue < minimumBid);
    onChange(event); // Call the onChange prop with the new value
  };
  return (
    <Box marginTop={5}>
      <TextField
        name="amount"
        fullWidth
        label={`Your ${action} (Required)`}
        variant="outlined"
        value={value}
        onChange={handleOnChange}
        error={hasError}
        helperText={
          hasError
            ? `Bid amount of SAR ${minimumBid.toLocaleString()} should be SAR ${minimumBid.toLocaleString()} or higher`
            : ""
        }
        InputLabelProps={{
          style: {
            color: "#ffffffe6",
          },
        }}
      />
      <Typography
        textAlign="center"
        component="p"
        marginTop={1}
        color="#9d9d9d"
        fontSize={12}
      >
        The Minimum {action} amount is {minimumBid.toLocaleString()}
      </Typography>
      {/* {snackbarState?.open ? (
        <Typography
          textAlign="center"
          component="p"
          marginTop={1}
          color="#ff1744"
          fontSize={16}
        >
          {snackbarState.message}
        </Typography>
      ) : (
        ""
      )} */}
    </Box>
  );
}
