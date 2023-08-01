import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tabs, value, setValue }) {
  const handleChange = (event, newValue) => {
     setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "@media (max-width: 777px)": {
            borderBottom: 0,
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                padding: 0,
                "@media (max-width: 777px)": {
                  color: "white",
                  fontWeight: 900,
                  fontSize: 14,
                  ...(tab.isActive && {
                    "&.Mui-selected": {
                      padding: 0,
                      color: "white",
                      fontWeight: 900,
                      fontSize: 14,
                    },
                  }),
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
