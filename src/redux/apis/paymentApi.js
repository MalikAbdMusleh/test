import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { profileApi } from './profile.api'

const paymentApi = profileApi.injectEndpoints({
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers, { getState }) => {
            const accessToken = getState()?.auth?.token?.accessToken;
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`)
            }
            return headers
        },
    }),

    tagTypes: ['Profile'],
    endpoints: (build) => ({
        generateCardUrl: build.mutation({
            query: (data) => {
                return {
                    url: process.env.NEXT_PUBLIC_API_BASE_URL+'/payments/generate-temp-payment-url',
                    headers: { path: '/payments/generate-temp-payment-url', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: data.type === 'inspection_report_advanced_buyer' ? {
                        "requestType": "inspection_report_advanced_buyer",
                        "inspectionReportRequestId": data.inspectionReportId,
                        "currencyCode": "SAR",
                        "amount": data.amount,
                        "paymentType": "card",
                        "saveCard": 1,
                        "device": {
                            "browser": "MOZILLA",
                            "colorDepth": 24,
                            "javaEnabled": true,
                            "language": "en-US",
                            "screenHeight": 640,
                            "screenWidth": 480,
                            "timeZone": 273,
                            "ipAddress": "127.0.0.1"
                        }
                    } : data.type === 'admin_fee' ? {
                        "requestType": "admin_fee",
                        "auctionVehicleId": data.inspectionReportId,
                        "currencyCode": "SAR",
                        "amount": data.amount,
                        "paymentType": "card",
                        "saveCard": 1,
                        "device": {
                            "browser": "MOZILLA",
                            "colorDepth": 24,
                            "javaEnabled": true,
                            "language": "en-US",
                            "screenHeight": 640,
                            "screenWidth": 480,
                            "timeZone": 273,
                            "ipAddress": "127.0.0.1"
                        }
                    } : {
                        requestType: data.type,
                        currencyCode: "SAR",
                        amount: data.amount,
                        paymentType: "card",
                        saveCard: 1,
                        device: {
                            browser: "MOZILLA",
                            colorDepth: 300,
                            javaEnabled: true,
                            language: "ar-EGY",
                            screenHeight: 640,
                            screenWidth: 480,
                            timeZone: 273,
                            ipAddress: "127.0.0.1"
                        }
                    }
                }
            }
        }),
        generateStcPayment: build.mutation({
            query: (data) => {
                const bodyTypeMapping = {
                    wallet: {
                        "requestType": "wallet",
                        "amount": data.amount,
                        "currencyCode": "SAR",
                        "tellerId": "Android",
                        "deviceId": "MyDevice",
                        "mobileNumber": "966556615586"
                    },
                    inspection_report_advanced_buyer: {
                        "requestType": "inspection_report_advanced_buyer",
                        "inspectionReportRequestId": data.inspectionReportId,
                        "amount": data.amount,
                        "currencyCode": "SAR",
                        "tellerId": "Android",
                        "deviceId": "MyDevice",
                        "mobileNumber": "0557877988"
                    },
                    inspection_report_basic_seller: {
                        "requestType": "inspection_report_basic_seller",
                        "inspectionReportRequestId": data.inspectionReportId,
                        "amount": data.amount,
                        "currencyCode": "SAR",
                        "tellerId": "Android",
                        "deviceId": "MyDevice",
                        "mobileNumber": "0557877988"
                    },
                    admin_fee: {
                        "requestType": "admin_fee",
                        "inspectionReportRequestId": data.inspectionReportId,
                        "amount": data.amount,
                        "currencyCode": "SAR",
                        "tellerId": "Android",
                        "deviceId": "MyDevice",
                        "mobileNumber": "0557877988"
                    }
                }
                return {
                    url: '/home',
                    headers: { path: '/payments/stc-pay/initiate', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: bodyTypeMapping[data.type]
                }
            }
        }),
        applePay: build.mutation({
            query: (amount) => {

                return {
                    url: '/home',
                    headers: { path: '/payments/apple-pay/make-payment', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: {
                        "requestType": "wallet",
                        "amount": amount,
                        "currencyCode": "SAR",
                        "tellerId": "Android",
                        "deviceId": "MyDevice",
                        "mobileNumber": "966556615586"
                    }
                }
            }
        }),
        getSavedCards: build.query({
            query: () => ({
                url: '/home',
                headers: { path: '/user/saved-payment-cards' },
                method: 'GET'
            })
        }),
        cardTokenization: build.mutation({
            query: (data) => {
                const bodyTypeMapping = {
                    wallet: {
                        "requestType": "wallet",
                        "currencyCode": "SAR",
                        "amount": data.amount,
                        "paymentType": "card-tokenization",
                        "userPaymentCardId": data.card,
                        "device": {
                            "browser": "MOZILLA",
                            "colorDepth": 300,
                            "javaEnabled": true,
                            "language": "en-US",
                            "screenHeight": 640,
                            "screenWidth": 480,
                            "timeZone": 273,
                            "ipAddress": "127.0.0.1"
                        }
                    },
                    inspection_report_advanced_buyer: {
                        "requestType": "inspection_report_advanced_buyer",
                        "inspectionReportRequestId": data.inspectionReportId,
                        "currencyCode": "SAR",
                        "amount": data.amount,
                        "paymentType": "card-tokenization",
                        "userPaymentCardId": data.card,
                        "saveCard": 1,
                        "device": {
                            "browser": "MOZILLA",
                            "colorDepth": 24,
                            "javaEnabled": true,
                            "language": "en-US",
                            "screenHeight": 640,
                            "screenWidth": 480,
                            "timeZone": 273,
                            "ipAddress": "127.0.0.1"
                        }
                    },
                    inspection_report_basic_seller: {
                        "requestType": "inspection_report_basic_seller",
                        "auctionVehicleId": data.inspectionReportId,
                        "currencyCode": "SAR",
                        "amount": data.amount,
                        "paymentType": "card-tokenization",
                        "userPaymentCardId": data.card,
                        "saveCard": 1,
                        "device": {
                            "browser": "MOZILLA",
                            "colorDepth": 24,
                            "javaEnabled": true,
                            "language": "en-US",
                            "screenHeight": 640,
                            "screenWidth": 480,
                            "timeZone": 273,
                            "ipAddress": "127.0.0.1"
                        }
                    },
                    admin_fee: {
                        "requestType": "admin_fee",
                        "auctionVehicleId": data.inspectionReportId,
                        "currencyCode": "SAR",
                        "amount": data.amount,
                        "paymentType": "card-tokenization",
                        "userPaymentCardId": data.card,
                        "saveCard": 1,
                        "device": {
                            "browser": "MOZILLA",
                            "colorDepth": 24,
                            "javaEnabled": true,
                            "language": "en-US",
                            "screenHeight": 640,
                            "screenWidth": 480,
                            "timeZone": 273,
                            "ipAddress": "127.0.0.1"
                        }
                    }
                }
                return {
                    url: process.env.NEXT_PUBLIC_API_BASE_URL+'/payments/generate-temp-payment-url',
                    headers: { path: '/payments/generate-temp-payment-url', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: bodyTypeMapping[data.type]
                }
            }
        }),
    }),
    overrideExisting: false,
})

export const {
    useGenerateCardUrlMutation,
    useGenerateStcPaymentMutation,
    useApplePayMutation,
    useGetSavedCardsQuery,
    useCardTokenizationMutation
} = paymentApi