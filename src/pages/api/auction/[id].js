export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/${req?.query?.id}?currencyCode=${req?.query?.params?.currencyCode}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      return res.status(200).json(response);
    })
    .catch((error) => console.log("error", error));
}
