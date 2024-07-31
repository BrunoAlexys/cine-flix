import axios from "axios";
import { Tv } from "../../type/tv";
import { TvResponse } from "../../type/tvResponse";
import { PaginatedSeriesResponse } from "../../type/paginatedSeries";


const apiTvUrl = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiTvUrl || !apiKey) {
    console.error('API URL or API Key not found');
}

const reqTv = axios.create({
    baseURL: apiTvUrl
});

export const getTv = async (): Promise<Tv[]> => {
    try {
        const response = await reqTv.get<TvResponse>("popular", {
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar as séries mais populares:", error);
        throw error;
    }
}

export const getPaginatedTv = async (page: number): Promise<PaginatedSeriesResponse> => {
    try {
        const response = await reqTv.get<TvResponse>('popular', {
            params: {
                api_key: apiKey,
                language: 'pt-BR',
                page: page
            }
        });

        return {
            results: response.data.results.slice(0, 18),
            totalPages: response.data.total_pages
        };
    } catch (error) {
        console.error("Erro ao buscar as séries mais populares:", error);
        throw error;
    }
}