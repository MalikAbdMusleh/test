export default function handler(req, res) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);
    
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: req?.body,
      redirect: "follow",
    };

   
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/preview-buy-now?auctionVehicleId=${req?.query?.auctionVehicleId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        res.status(200).json(response);
      })
  
      .catch((error) => console.log("error", error));
  }
  