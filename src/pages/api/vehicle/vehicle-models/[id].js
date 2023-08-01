export default function handler(req, res) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicle-models/${req?.query?.id}`, requestOptions)
     .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        console.log(response)
        res.status(200).json(response);
      })
      .catch((error) => console.log("error", error));
  }
  