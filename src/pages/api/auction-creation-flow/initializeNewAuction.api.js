export default async function handler(req, res) {
    try {
      const {
        auctionVehicleTypeId,
        sellerType,
        sellerSaudiId,
        vehicleAvailableForSale,
        listable,
        startingPrice,
        vehicleYear,
        vehicleModelId
      } = req.query;
  
      const params = new URLSearchParams();
      if (auctionVehicleTypeId !== undefined && auctionVehicleTypeId !== null) {
        params.append('auctionVehicleTypeId', auctionVehicleTypeId);
      }
      if (sellerType !== undefined && sellerType !== null) {
        params.append('seller[type]', sellerType);
      }
      if (sellerSaudiId !== undefined && sellerSaudiId !== null) {
        params.append('seller[saudiId]', sellerSaudiId);
      }
      if (vehicleAvailableForSale !== undefined && vehicleAvailableForSale !== null) {
        params.append('vehicleAvailableForSale', vehicleAvailableForSale);
      }
      if (listable !== undefined && listable !== null) {
        params.append('listable', listable);
      }
      if (startingPrice !== undefined && startingPrice !== null) {
        params.append('startingPrice', startingPrice);
      }
      if (vehicleYear !== undefined && vehicleYear !== null) {
        params.append('vehicleYear', vehicleYear);
      }
      if (vehicleModelId !== undefined && vehicleModelId !== null) {
        params.append('vehicleModelId', vehicleModelId);
      }
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        },
        redirect: 'follow'
      };
  
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/initialize?${params.toString()}`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      res.status(200).json({ data });
  
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  