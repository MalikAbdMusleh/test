export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const stringParams = new URLSearchParams(req.query).toString();
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles/offers/list?${stringParams}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      res.status(200).json(response);
    })

    .catch((error) => console.log("error", error));
}
