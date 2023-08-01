export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", req.headers.authorization);

  if (req.method === 'POST') {
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var urlencoded = new URLSearchParams();
    urlencoded.append("channel", "push-notification");
    urlencoded.append("category", req.body.category);
    urlencoded.append("opted", req.body.opted);


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: urlencoded
    }
  }
  if (req.method === 'GET') {
    myHeaders.append("N-Meta", "web;local");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

  }

  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/preferences`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result)
      res.status(200).json(response)
    })
    .catch((error) => console.log('error', error))
}
