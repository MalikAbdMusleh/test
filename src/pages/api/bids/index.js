export default function handler(req, res) {
  if (req.query.currencyCode) {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", req.headers.authorization);
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bids?auctionVehicleId=${req.query.auctionVehicleId}&auctionedPrice=${req.query.auctionedPrice}&hasMaxBid=${req.query.hasMaxBid}&maxBidAmount=${req.query.maxBidAmount}&currencyCode=${req.query.currencyCode}`,
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
  } else {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", req.headers.authorization);
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bids?auctionVehicleId=${req.query.auctionVehicleId}&auctionedPrice=${req.query.auctionedPrice}`,
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
}
