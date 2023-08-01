export default function handler(req, res) {


  if (req.method === 'PATCH') {
    console.log('PAAAATCH', req.params);
    const messageId = id || idFromPath
    var myHeaders = new Headers()
    myHeaders.append("authorization", req.headers.authorization);
    myHeaders.append("N-Meta", "web;local");
    myHeaders.append("X-Localization", "en");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("status", "unread");

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    console.log('NOT URL', `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/push-messages/${messageId}`);
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/push-messages/${messageId}`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        res.status(200).json({ data: result })
      })
      .catch((error) => console.log('error', error))
  }
  if (req.method === 'GET') {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", req.headers.authorization);
    myHeaders.append("Content-Type", req.headers.authorization);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/push-messages`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result)
        res.status(200).json(response)
      })
      .catch((error) => console.log('error from push messages', error))
  }
}
