export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var body = JSON.parse(req.body);

  console.log("parsed body ----> ", body);

  var urlencoded = new URLSearchParams();
  urlencoded.append("firstName", body.firstName);
  urlencoded.append("lastName", body.lastName);
  urlencoded.append("dateOfBirth", body.dateOfBirth);
  urlencoded.append("email", body.email);
  urlencoded.append("password", body.password);
  urlencoded.append("areaCode", body.areaCode);
  urlencoded.append("mobile", body.mobile);
  urlencoded.append("address", body.address);
  urlencoded.append("city", body.city);
  urlencoded.append("state", body.state);
  urlencoded.append("country", body.country);
  urlencoded.append("favouriteBankId", body.favouriteBankId);
  urlencoded.append("checkedTc", body.checkedTc);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, requestOptions)
    .then((response) => {
      res.status(response.status)
      return response.text()
    })
    .then((result, err) => {
      res.send(result)
    })
    .catch((error) => console.log("error", error));
}
