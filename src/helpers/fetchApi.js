import axios from 'axios';

export const fetchApi = async ({ url, method = 'GET', data = null , headers}, isClient = false) => {
    try {
        const baseUrl = isClient ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL
        // const accessToken = isClient ? process.env.NEXT_PUBLIC_ACCESS_TOKEN : process.env.ACCESS_TOKEN;
        const response = await axios.request({
            url: `${baseUrl}/${url}`, method,
            headers: {...headers},
            ...(data && { data })
        });

        return response.data;
    } catch (error) {
        console.log("Error:", error.message);
        throw error;
    }
};
