export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.parse(req.body);

  var raw = JSON.stringify({
    userId: body.userId,
  });

  console.log("raw ----> ", raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/request-email-verification`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log("error", error));
}
