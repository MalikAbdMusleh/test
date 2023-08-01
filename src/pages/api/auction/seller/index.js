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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles?${stringParams}`,
    requestOptions
  )
    .then((response) => {
      res.status(response.status);
      return response.text();
    })
    .then((result, err) => {
      res.send(result);
    })
    .catch((error) => console.log("error", error));
}
