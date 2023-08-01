export default function handler(req, res) {
  console.log(req?.query)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };


  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/businesses/listings?businessId=${req?.query?.businessId}&auctionVehicleTypeId=${req?.query?.auctionVehicleTypeId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      res.status(200).json(response);
    })
    .catch((error) => console.log("error", error));
}
