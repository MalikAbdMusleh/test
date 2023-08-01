export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);
  myHeaders.append("N-Meta", "web;local");

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites/${req.body.auctionId}`,
    requestOptions,
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
