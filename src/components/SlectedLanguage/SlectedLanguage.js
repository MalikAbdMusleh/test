import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSSR, useTranslation } from "react-i18next";
function SlectedLanguage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  useSSR(); // Ensure translations are preloaded during server-side rendering

  useEffect(() => {
    document.body.dir = i18n.dir();
  });

  return (
    <div>
      <IconButton
        size="large"
        aria-label="Search"
        color="primary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            changeLanguage("ar");
          }}
        >
          Arabic
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            changeLanguage("en");
          }}
        >
          English
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SlectedLanguage;
