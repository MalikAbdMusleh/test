// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchApi } from "@/helpers/fetchApi";
import { authApi } from "@/redux/apis/authApi";
import { makeStore } from "@/redux/store";

export default function handler(req, res) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", req.headers.authorization);
    if (req.headers['content-type'])
        myHeaders.append("Content-Type", req.headers['content-type']);
    var raw = JSON.stringify(req.body);
    var requestOptions = {
        method: req.method,
        headers: myHeaders,
        redirect: 'follow'
    };
    if (req.method === 'POST')
        requestOptions.body = raw
    const stringParams = new URLSearchParams(req.query).toString();
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${req.headers.path}?${stringParams}`, requestOptions)
        .then((response) => {
            res.status(response.status)
            return response.text()
        })
        .then((result, err) => {
            res.send(result)
        })
        .catch((error) => console.log("error", error));
}
