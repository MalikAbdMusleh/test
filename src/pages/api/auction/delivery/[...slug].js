export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.ACCESS_TOKEN}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/countries`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
