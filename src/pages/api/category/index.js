export default function handler(req, res) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${req.headers.path}`);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${req.headers.path}`, requestOptions)
        .then((response) => {
            res.status(response.status)
            return response.text()
        })
        .then((result, err) => {
            console.log('RES#', result);
            res.send(result)
        })
        .catch((error) => console.log("error", error));
}
