export default async function handler(req, res) {
    try {
      const mediaId = req.params.mediaId;
  
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        },
        redirect: 'follow'
      };
  
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/${mediaId}/delete-media`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      res.status(200).json({ data });
  
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  