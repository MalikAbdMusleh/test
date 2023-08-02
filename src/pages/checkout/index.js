import { Divider, Grid } from "@mui/material";
import Payment from "../payment";
import PriceBreakdown from "../price-breakdown";
import { maxWidth } from "@mui/system";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useBuyNowPreviewMutation, useLockBuyMutation } from "@/redux/apis/auction-salesApi/buynowApi";

const Checkout = () => {
    const router = useRouter();
    const lng = router?.query?.lng
    const lat = router?.query?.lat
    const address = router?.query?.address
    const [addressOption, setAddressOption] = useState();
    const [addresses, setAddresses] = useState([]);
    const [pricingData, setPricingData] = useState([])
    

    const mapPricingData = (apiResponse) => {
        setPricingData(state => ([
            {
                id: 0,
                label: "Item Price",
                cost: `${apiResponse['currencyCode']} ${apiResponse['vehiclePrice'].amount}`,
            },
            { id: 1, label: "Mazadak Fee", cost: `${apiResponse['currencyCode']} ${apiResponse['commission'].amount}`, },
            { id: 2, label: "VAT", cost: `${apiResponse['currencyCode']} ${apiResponse['vat'].amount}` },
            // {
            //     id: 3,
            //     label: "Delivery Fee",
            //     value: "deliveryFee",
            //     cost: addressOption === 'pickup' ? '----' : `${apiResponse['currencyCode']} ${apiResponse['deliveryFee'].amount}`,
            // },
            { id: 3, label: "Deposit", cost: `${apiResponse['currencyCode']} ${apiResponse['deposit'].amount}` },
            { id: 4, label: "Total Price", cost: `${apiResponse['currencyCode']} ${apiResponse['totalPrice'].amount}` },

        ]))

    }
    const [buyNowPreviewQ, buyNowPreviewRes] = useBuyNowPreviewMutation();
    useEffect(() => {
        // const requestBody = addressOption ? {
        //     "delivery": {
        //         "capacity": 1,
        //         "coordinates": {
        //             "latitude": lat,
        //             "longitude": lng
        //         }
        //     }
        // } : {};
        buyNowPreviewQ(
            {
                body: {},
                params: `auctionVehicleId=${router.query.id}`
            }
        ).unwrap().then(res => {
            mapPricingData(res)
        })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (address) {
            const fullAddress = { address, lng, lat, val: address }
            const oldAdd = addresses.find(el => el.lng === fullAddress.lng && el.lat === fullAddress.lat)
            if (!oldAdd) {
                console.log(fullAddress);
                const oldAdds = [...addresses];
                oldAdds.push(fullAddress)
                setAddresses(oldAdds)
            }
        }
    }, [address])
    return (
        <Grid
            mt={10}
            container
            width={{ lg: '100vw' }}
        >
            <Grid item xs={12} md={7}>
                <Payment
                    newAddress={{ address, lng, lat, val: address }}
                    addressOption={addressOption}
                    setAddressOption={setAddressOption}
                    id={router?.query?.id}
                    addresses={addresses}
                    setAddresses={setAddresses}
                />
            </Grid>
            <Divider sx={{ mx: 4 }} orientation="vertical" flexItem />
            <Grid item xs={12} md={4} maxWidth={'100%'}>
                <PriceBreakdown 
                lng={lng}
                lat={lat}
                id={router?.query?.id} 
                pricingData={pricingData} 
                addressOption={addressOption} 
                />
            </Grid>
        </Grid>
    )
}


export default Checkout;