export default function handler(req, res) {
    const regionId = req.query.regionId;
  
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/cities?regionId=${regionId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        res.status(200).json(response);
      })
      .catch((error) => console.log("error", error));
  }
  