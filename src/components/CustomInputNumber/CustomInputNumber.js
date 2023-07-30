import { forwardRef, useState } from "react";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputMask from "react-input-mask";

const CustomInputNumber = forwardRef(
  (
    {
      value,
      name,
      label,
      helperTxt,
      handleInputChange,
      handleBlur,
      isPasswordField = false,
      error,
      prefix = false,
      required,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleInputValidation = (e) => {
      const inputValue = e.target.value;
      // Allow only numbers and restrict input to 9 digits
      if (/^\d{0,9}$/.test(inputValue)) {
        handleInputChange(e);
      }
    };
    return (
      <InputMask
        value={value}
        onChange={handleInputValidation}
        onBlur={handleBlur}
      >
        {(inputProps) => (
          <TextField
            inputRef={ref}
            label={label}
            type={"number"}
            name={name}
            fullWidth
            variant="outlined"
            margin="dense"
            value={value}
            onChange={handleInputValidation}
            onBlur={handleBlur}
            helperText={helperTxt}
            error={error}
            required={required}
            sx={{
              "& fieldset": {
                borderRadius: 3,
              },
            }}
            InputProps={{
              ...inputProps,
              endAdornment: isPasswordField ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
              startAdornment:
                prefix && typeof prefix === "string" ? (
                  <InputAdornment
                    position="start"
                    style={{
                      opacity: 0.5,
                    }}
                  >
                    {prefix}
                  </InputAdornment>
                ) : null,
            }}
            InputLabelProps={{
              sx: {
                color: "white",
              },
            }}
          />
        )}
      </InputMask>
    );
  }
);

// Setting the display name for the component
CustomInputNumber.displayName = "CustomInputNumber";

export default CustomInputNumber;
