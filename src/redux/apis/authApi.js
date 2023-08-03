import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState()?.auth?.token?.accessToken
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      return headers
    },

  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  tagTypes: ['AuthToken'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => {
        if (!!body.email && !!body.password)
          return {
            url: "/login",
            body: body,
            method: "POST",
          };
        return { error: 'incomplete' }

      },
      transformErrorResponse: (response, meta, arg) => response.data,
      providesTags: ['AuthToken']
    }),

    logout: builder.mutation({
      query: (q, state) => {
        return {
          url: "/logout"
        };
      },
      invalidatesTags: ['AuthToken']
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: `/reset-password`,
        body:{email:email},
        method: 'POST'
      }),
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: `/register`,
          method: "POST",
          body: body,
        };
      },
      transformResponse: (response, meta, arg) => {
        return response;
      },
      // transformErrorResponse: (response, meta, arg) => response,
    }),
    emailVerification: builder.mutation({
      query: (userId) => ({
        url: `/user/request-email-verification`,
        body: { userId: userId },
        method:'POST'
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useEmailVerificationMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = authApi;


export const {
  login,
  logout,
  resetPassword,
  register,
  emailVerification
} = authApi.endpoints;
export const { endpoints, reducerPath, reducer, middleware } = authApi;
