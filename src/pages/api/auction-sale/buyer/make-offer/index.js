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

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/sale/buyer/make-offer`,
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
