export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses?limit=${req?.query?.limit}&businessId=${req?.query?.businessId}&auctionVehicleTypeId=${req?.query?.auctionVehicleTypeId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      console.log(response)
      res.status(200).json({data:response.data});
    })
    .catch((error) => console.log("error", error));
}
