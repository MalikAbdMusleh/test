import { createSlice } from '@reduxjs/toolkit'
import subcategoryData from '@/data/subCategoryData.json'

const initialState = {
    formState: {
        make: null,
        model: null,
        km: null,
        year: null,
        fuelType: null,
        transmission: null,
        cylinders: null,
        interiorColor: null,
        exteriorColor: null,
        condition: null,
        description: "",
        saleType: 'sale',
        sellerType: null,
        commercialRegistration: "",
        companyVatNo: "",
        canAcceptOffers: false,
        location: {},
        reservePrice: "",
        buyNowPrice: "",
        title: '',
        vehiclePrice: "",
        itemLocation: null
    },
    uploadedFiles: [],
    catId: null,
    subcatId: null,
    subcategories: [],
    subcategoriesData: []
}
export const c2cSlice = createSlice({
    name: 'c2c',
    initialState,
    reducers: {
        setFormState: (state, action) => {
            state.formState = { ...state.formState, ...action.payload }
        },
        setC2CCategory: (state, action) => {
            state.catId = action.payload;
            state.subcategories = subcategoryData.filter(el => el.catId === action.payload);
        },
        setC2CSubCategory: (state, action) => {
            state.subcatId = action.payload;
        },
        setUploadedFiles: (state, action) => {
            state.uploadedFiles = action.payload
        },
        resetFormState: (state) => {
            state.formState = {
                make: null,
                model: null,
                km: null,
                year: null,
                fuelType: null,
                transmission: null,
                cylinders: null,
                interiorColor: null,
                exteriorColor: null,
                condition: null,
                description: "",
                saleType: 'sale',
                sellerType: null,
                commercialRegistration: "",
                companyVatNo: "",
                canAcceptOffers: false,
                location: {},
                reservePrice: "",
                buyNowPrice: "",
                title: '',
                vehiclePrice: "",
                itemLocation: null
            }
        }
    },
})


export const { setFormState, setC2CCategory, setC2CSubCategory, resetFormState } = c2cSlice.actions

export default c2cSlice.reducer