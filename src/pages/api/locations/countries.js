export default function handler(req, res) {

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/countries`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const response = JSON.parse(result);
            res.status(200).json(response);
        })
        .catch((error) => console.log("error", error));
}