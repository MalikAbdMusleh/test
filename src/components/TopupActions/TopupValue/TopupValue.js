import { Box, TextField, Typography } from "@mui/material";

export default function TopupValue({
  value,
  onChange,
  action,
  hasError,
  minimumBid,
  snackbarState,
}) {
  console.log(snackbarState);
  return (
    <Box marginTop={5}>
      <TextField
        name="amount"
        fullWidth
        label={`Your ${action} (Required)`}
        variant="outlined"
        value={value}
        onChange={onChange}
        error={hasError}
        helperText={hasError ? "This field is required" : ""}
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
      {snackbarState?.open ? (
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
      )}
    </Box>
  );
}
