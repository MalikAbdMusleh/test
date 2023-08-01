export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.parse(req.body);

  console.log("-----body---->", body);

  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password?email=${body.email}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log("error", error));
}
