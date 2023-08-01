export default function handler(req, res) {
  if (req.body) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);
    myHeaders.append("N-Meta", "web;local");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams()
    for (const key in req.body) {
      urlencoded.append(key, req.body[key])
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: urlencoded,
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/devices`, requestOptions)
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
    myHeaders.append('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`)
    const id = req.url.split('/').pop()
    var requestOptions = {
      method: 'delete',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/devices/${id}`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result)
        res.status(200).json(response)
      })
      .catch((error) => console.log('error', error))
  }
}
