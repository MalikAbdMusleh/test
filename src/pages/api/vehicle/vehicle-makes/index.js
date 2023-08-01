export default function handler(req, res) {

  if (req.query.onlyActive) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicle-makes?onlyActive=${req.query.onlyActive}&sortBy=${req.query.sortBy}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        res.status(200).json(response);
      })
      .catch((error) => console.log("error", error));
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicle-makes/${req?.params?.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);

        res.status(200).json(response);
      })
      .catch((error) => console.log("error", error));
  }
}
