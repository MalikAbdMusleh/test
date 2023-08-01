export default async function handler(req, res) {
    try {
      const requestData = req.body;
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify(requestData),
        redirect: 'follow'
      };
  
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/upgrades/store`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      res.status(200).json({ data });
  
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  