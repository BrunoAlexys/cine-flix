import axios from "axios";
import { MediaItem } from "../../type/mediaItem";
import { PaginatedMediaResponse } from "../../type/paginatedMediaResponse";
import { MediaResponse } from "../../type/mediaResponse";


const apiTvUrl = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiTvUrl || !apiKey) {
    console.error('API URL or API Key not found');
}

const reqTv = axios.create({
    baseURL: apiTvUrl
});

export const getTv = async (): Promise<MediaItem[]> => {
    try {
        const response = await reqTv.get<MediaResponse>("popular", {
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

export const getPaginatedTv = async (page: number): Promise<PaginatedMediaResponse> => {
    try {
        const response = await reqTv.get<MediaResponse>('popular', {
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

export const searchSeriesByTitle = async (title: string): Promise<MediaItem[]> => {
    try {
        const response = await reqTv.get<MediaResponse>('https://api.themoviedb.org/3/search/tv', {
            params: {
                api_key: apiKey,
                language: 'pt-BR',
                query: title
            }
        });
        
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar as séries por título:", error);
        throw error;
    }
}