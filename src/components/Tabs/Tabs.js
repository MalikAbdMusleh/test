import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Tabs({ salesComponent, auctionComponent }) {
  const homeData = useSelector((state) => state.home);
  const { t, i18n } = useTranslation();

  const [value, setValue] = useState(homeData?.activeTab || "sale");

  const handleChange = (event, newValue) => setValue(newValue);

  const [sidebarWidth, setSidebarWidth] = useState(undefined);
  const [sidebarTop, setSidebarTop] = useState(undefined);
  const orientationCB = () => {
    setSidebarWidth(window.width);
    setSidebarTop(200);
  };
  useEffect(() => {
    window.addEventListener("orientationchange", orientationCB);
    const sidebarEl = document
      .querySelector(".sticky-tabs")
      .getBoundingClientRect();
    setSidebarWidth(sidebarEl.width);
    setSidebarTop(sidebarEl.top);
  }, []);

  useEffect(() => {
    if (!sidebarTop) return;
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sidebarTop]);

  const isSticky = (e) => {
    const sidebarEl = document.querySelector(".sticky-tabs");
    const scrollTop = window.scrollY;
    if (scrollTop >= sidebarTop - 10) {
      sidebarEl?.classList?.add("is-sticky");
    } else {
      sidebarEl?.classList?.remove("is-sticky");
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", width: sidebarWidth }}
          className="sticky-tabs"
        >
          <TabList variant="fullWidth" onChange={handleChange}>
            <Tab label={t("common:home.sale")} value="sale" />
            <Tab label={t("common:home.auction")} value="auction" />
          </TabList>
        </Box>
        <TabPanel value="sale" sx={{ padding: 0, paddingBottom: 10 }}>
          {salesComponent}
        </TabPanel>
        <TabPanel value="auction" sx={{ padding: 0, paddingBottom: 10 }}>
          {auctionComponent}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
