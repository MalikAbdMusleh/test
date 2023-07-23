export default function handler(req, res) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(
      `${process.env.API_BASE_URL}/profile/watchlists`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        res.status(200).json(response);
      })
      .catch((error) => console.log("error", error));
  }
  