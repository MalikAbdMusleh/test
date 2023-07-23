export default async function handler(req, res) {
    try {
      const auctionVehicleId = req.params.auctionVehicleId;
      const requestData = req.body;
  
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify(requestData),
        redirect: 'follow'
      };
  
      const url = `${process.env.API_BASE_URL}/auction-vehicles/${auctionVehicleId}`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      res.status(200).json({ data });
  
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  