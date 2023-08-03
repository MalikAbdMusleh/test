import ScrollTop from "@/components/ScrollTop/ScrollTop";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Tabs from "@/components/Tabs/Tabs";
import Sales from "@/widgets/Sales/Sales";
import { useTheme } from "@mui/material";

import dynamic from 'next/dynamic'

const Auction = dynamic(() => import("@/widgets/Auction/Auction"))

export default function Home(props) {
  // const lala = useGetBusinessesListQuery()
  const theme = useTheme();
  const setActiveTab = (tab) => {
    console.log(tab, "tabzaid");
  };

  return (
    <>
      <Tabs
        salesComponent={<Sales />}
        auctionComponent={<Auction />}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
      />
      <ScrollTop {...props}>
        <Fab
          style={{ background: theme.palette.primary.main }}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
