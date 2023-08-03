import ProductCardSmall from "@/components/Cards/ProductCard/ProductCardSmall";
import SectionList from "@/components/SectionList/SectionList";
import Categories from "@/widgets/Categories/Categories";
import RecentSearches from "@/widgets/RecentSearches/RecentSearches";
import SearchContainer from "@/widgets/SearchBox/SearchContainer/SearchContainer";
import SearchResults from "@/widgets/SearchResults/SearchResults";
import { Box } from "@mui/material";
import { categoriesDataMain } from "@/lib/constants";
import { useEffect, useState } from "react";
import { wrapper } from "@/redux/store";
import {
  getHomeCategories,
  getRunningQueriesThunk,
  useGetHomeCategoriesQuery,
} from "@/redux/apis/homeApi";
import {
  getVehicleMake,
  getRunningQueriesThunk as getRunningQueriesThunkVehicleMaker,
  useGetVehicleMakeQuery,
  getVehicleModel,
  useGetVehicleModelQuery,
  useGetVehicleTrimsQuery,
} from "@/redux/apis/vehicleApi";
import { useGetAuctionFilterMutation } from "@/redux/apis/auctionSearchApi";
import { useSelector } from "react-redux";
const restateData = {
  id: 18,
  userId: 1,
  img: "/imgs/auction_images/plate.jpeg",
  heading: "ط ط ط ٦٣",
  flag: "sa",
  description:
    "description lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sط ط ط ٦٣",
  note: "1000KM",
  catId: 5,
  subcatId: 0,
  featured: true,
  addedAt: "07/04/2023",
  views: 5,
  clicks: 0,
  sold: "24/07/2023",
  isFavourite: false,
  type: "auction",
  auctionType: "upcoming",
  link: "/lot-details",
};

export default function Search() {
  const { data } = useSelector((state) => state.advanceSearch);
  const [state, setState] = useState({
    sortModal: {
      isOpen: false,
    },
    searchInput: "",
  });

  window.onblur = function () {
    localStorage.removeItem("searchInput");
  };

  const toggleSortModal = () => {
    setState((prevState) => ({
      ...prevState,
      sortModal: {
        isOpen: !prevState.sortModal.isOpen,
      },
    }));
  };

  const handleSearchInputChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      searchInput: value,
    }));
    localStorage.setItem("searchInput", value);
  };
  return (
    <Box marginTop={3} marginBottom={5}>
      <Box marginBottom={2}>
        <SearchContainer
          hideSearch
          searchValue={state.searchInput || localStorage.getItem("searchInput")}
          onSearchInputChange={handleSearchInputChange}
        />
        <Box>
          <SearchResults
            isSortModalOpen={state.sortModal.isOpen}
            searchValue={"state.searchInput"}
            toggleSortModal={toggleSortModal}
            data={data}
          />
        </Box>
      </Box>
    </Box>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     // store.dispatch(getHomeCategories.initiate());
//     store.dispatch(
//       getVehicleMake.initiate({
//         onlyActive: 1,
//         sortBy: "mostPopular",
//       })
//     );

//     store.dispatch(getVehicleModel.initiate());

//     const lala = Promise.all([
//       // store.dispatch(getRunningQueriesThunk()),
//       store.dispatch(getRunningQueriesThunkVehicleMaker()),
//     ]);

//     try {
//       const values = await lala;
//       console.log(values); // [resolvedValue1, resolvedValue2]
//     } catch (error) {
//       console.log(error); // rejectReason of any first rejected promise
//     }
//     return {
//       props: {},
//     };
//   }
// );
