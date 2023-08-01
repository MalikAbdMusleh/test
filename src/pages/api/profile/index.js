export default function handler(req, res) {
  var myHeaders = new Headers();
  console.log(req?.headers?.authorization );
  myHeaders.append("authorization", req?.headers?.authorization );
  var requestOptions = {
    method: req.method,
    headers: myHeaders,
    redirect: 'follow'
  };
  console.log(requestOptions);
  const stringParams = new URLSearchParams(req.query).toString();
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile?${stringParams}`, requestOptions)
    .then((response) => {
      res.status(response.status)
      return response.text()
    })
    .then((result) => {
      console.log('#', result);
      res.send(result)
    })
    .catch((error) => console.log("error", error));
}
