export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(req?.body),
    redirect: "follow",
  };
  console.log(requestOptions);
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/sale/seller${req.headers.path}`);
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/sale/seller${req.headers.path}`,
    requestOptions
  )
    .then((response) => {
      res.status(response.status)
      return response.text()
    })
    .then((result, err) => {
      res.send(result)
    })
    .catch((error) => console.log("error", error));
}