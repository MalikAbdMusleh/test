export default function handler(req, res) {
  var myHeaders = new Headers()
  console.log('UNREAD HEADER --->', req.headers);
  myHeaders.append("Authorization", req.headers.authorization);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/push-messages/unread-count`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result)
      res.status(200).json(response)
    })
    .catch((error) => console.log('error', error))
}
