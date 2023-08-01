export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  myHeaders.append("N-Meta", "web;local");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "auctionId": req.body.auctionId
  });


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result)
      res.status(200).json(response)
    })
    .catch((error) => console.log('error', error))
}
