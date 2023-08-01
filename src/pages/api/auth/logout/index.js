export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", req.headers.authorization);

  console.log("logout Headers -->", myHeaders);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, requestOptions)
    .then((response) => response.text())
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log("error", error));
}
