import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const auctionApi = createApi({
  reducerPath: 'auctionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState()?.auth?.token?.accessToken;
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getAuctionDetailsbyID: builder.query({
      query: (arg) => {
        return {
          url: `auction/${arg?.id}`,
          params: arg?.params,
        };
      },
    }),

    getAuctionBySellerId: builder.query({
      query: (arg) => {
        return {
          url: `auction-vehicles?seller=${arg.sellerId}&type=active&saleType=auction`
        };
      },
    }),

    getPendingAuctionBySellerId: builder.query({
      query: (arg) => {
        return {  
          url: `auction-vehicles?seller=${arg.sellerId}&type=new&saleType=auction`
        };
      },
    }),
    getEndedAuctionBySellerId: builder.query({
      query: (arg) => {
        return {
          url: `auction-vehicles?seller=${arg.sellerId}&type=ended&saleType=auction`
        };
      },
    }),

    getActiveSallerBySellerId: builder.query({
      query: (arg) => {
        return {
          url: `auction-vehicles?seller=${arg.sellerId}&type=active&saleType=sale`
        };
      },
    }),

    getPendingSallerBySellerId: builder.query({
      query: (arg) => {
        return {  
          url: `auction-vehicles?seller=${arg.sellerId}&type=new&saleType=sale`
        };
      },
    }),
    getEndedSallerBySellerId: builder.query({
      query: (arg) => {
        return {
          url: `auction-vehicles?seller=${arg.sellerId}&type=ended&saleType=sale`
        };
      },
    }),
    getAuctionHighestBid: builder.query({
      query: ({ auctionVehicleId }) => {
        return {
          url: `auction/highest-bid/${auctionVehicleId}`,
        };
      },
    }),

    getAuctionTimeRemaining: builder.query({
      query: ({ id }) => {
        return {
          url: `auction/time-remaining/${id}`,
        };
      },
    }),

    getAuctionCountByTypeId: builder.query({
      query: (arg) => {
        return {
          url: `auction/count-by-type`,
          params: arg?.params,
        };
      },
    }),

    getAuctionDeliveryRates: builder.query({
      query: ({ rates }) => {
        return {
          url: `auction/delivery-rates/${rates}`,
        };
      },
    }),

    getAuctionDelivery: builder.query({
      query: (arg) => {
        return {
          url: `auction/delivery/${arg?.auctionVehicleId}/${arg?.latLng}`,
        };
      },
    }),
  }),
});

export const {
  useGetAuctionDetailsbyIDQuery,
  useGetAuctionBySellerIdQuery,
  useGetPendingAuctionBySellerIdQuery,
  useGetEndedAuctionBySellerIdQuery,
  useGetActiveSallerBySellerIdQuery,
  useGetEndedSallerBySellerIdQuery,
  useGetPendingSallerBySellerIdQuery,
  useGetAuctionHighestBidQuery,
  useGetAuctionTimeRemainingQuery,
  useGetAuctionCountByTypeIdQuery,
  useGetAuctionDeliveryRatesQuery,
  useGetAuctionDeliveryQuery,
  util: { getRunningQueriesThunk },
} = auctionApi;

export const {
  getAuctionDetailsbyID,
  getAuctionBySellerId,
  getAuctionHighestBid,
  getAuctionTimeRemaining,
  getAuctionCountByTypeId,
  getAuctionDeliveryRates,
  getAuctionDelivery,
} = auctionApi.endpoints;
export const { endpoints, reducerPath, reducer, middleware } = auctionApi;
