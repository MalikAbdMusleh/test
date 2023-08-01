export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var body = JSON.parse(req.body);

  var raw = JSON.stringify({
    email: body.email,
    password: body.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, requestOptions)
    .then((response) => {
      res.status(response.status)
      return response.text()
    })
    .then((result, err) => {
      res.send(result)
    })
    .catch((error) => console.log("error", error));
}
