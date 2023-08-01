export default async function handler(req, res) {
    try {
        const { buyerAndBuyNowUserId, type } = req.query;

        const params = new URLSearchParams();
        if (buyerAndBuyNowUserId) {
            params.append('buyerAndBuyNowUserId', buyerAndBuyNowUserId);
        }
        if (type) {
            params.append('type', type);
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
            redirect: 'follow',
        };

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auction-vehicles?${params.toString()}`;
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        res.status(200).json({ data: data.data });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
