import axios, { AxiosError } from "axios";
export default async function handler(req, res) {
  const headers = {
    Authorization: req?.headers?.authorization,
  };

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  });
  const endpoint = `/auction-vehicles/search-by-lot/${req?.query?.id}?currencyCode=SAR`;
  const config = {
    headers,
    redirect: "follow",
  };
  try {
    const { status, data } = await api.get(endpoint, config);
    const rStatus = status || 200;

    return res.status(rStatus).json(data);
  } catch (error) {
    console.log(error);
    // Check if the error is caused by the response and return the status error
    if (error instanceof AxiosError)
      return res.status(error.response.status || 500).json(error);

    // Otherwise the error is caused by Next server and return 500
    return res.status(500).json(error);
  }
}
