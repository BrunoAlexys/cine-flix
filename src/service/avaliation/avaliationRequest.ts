import axios from "axios";
import { AvaliationType } from "../../type/avaliationType";

const apiUrl = import.meta.env.VITE_API;
const apiTvUrl = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiUrl || !apiKey || !apiTvUrl) {
    console.error('API URL or API Key not found');
}

const reqMovie = axios.create({
    baseURL: apiUrl
});

const reqTv = axios.create({
    baseURL: apiTvUrl
});

export const getAvaliation = async (id: number, type: 'movies' | 'series'): Promise<AvaliationType> => {

    const req = type  === 'movies' ? reqMovie : reqTv;

    try {
        const response = await req.get<AvaliationType>(`${id}`, {
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        });

        return response.data;
    } catch (error) {  
        console.error("Erro ao buscar as avaliações:", error);
        throw error;
    }
}