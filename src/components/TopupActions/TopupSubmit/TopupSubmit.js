import { Box, Button, Typography } from "@mui/material";

const TopupSubmit = ({
  isSubmitted,
  onClick,
  minimumBid,
  depositAmount,
  buttonDisabel,
}) => {
  // console.log(isSubmitted);
  return (
    <Box
      padding={"1% 2% 0 3%"}
      sx={{
        width: "100%",
        bottom: 0,
        padding: "16px",
        color: "#fff",
        textAlign: "center",
        "@media(max-width: 776px)": {
          padding: "1% 10px 15px 10px",
        },
      }}
    >
      {!isSubmitted && (
        <Typography
          variant="body1"
          fontSize={13}
          lineHeight={1.2}
          style={{
            marginBottom: "8px",
            color: "#F44336",
          }}
        >
          You do not have enough money in your wallet to bid. You must have a
          minimum of {depositAmount?.amount.toLocaleString()} in order to
          proceed.
        </Typography>
      )}
      <Button
        onClick={onClick}
        variant={isSubmitted ? "contained" : "outlined"}
        fullWidth
        disabled={buttonDisabel}
        sx={{
          borderRadius: "16px",
          padding: "13px",
          fontSize: "16px",
          fontWeight: 800,
        }}
      >
        {isSubmitted ? "Confirm" : "Top up"}
      </Button>
      <Typography
        variant="body2"
        style={{
          textAlign: "center",
          marginTop: "8px",
          color: "#9d9d9d",
          fontSize: "12px",
        }}
      >
        Minimum increment: {minimumBid.currency.code}{" "}
        {minimumBid.amount.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default TopupSubmit;
