export default async function handler(req, res) {
    try {
      const auctionVehicleId = req.params.auctionVehicleId;
      const { mediaPhoto, photoType } = req.body;
  
      const formData = new FormData();
      formData.append('mediaPhoto', mediaPhoto);
      formData.append('photoType', photoType);
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: formData,
        redirect: 'follow'
      };
  
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/${auctionVehicleId}/upload-media`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      res.status(200).json({ data });
  
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  