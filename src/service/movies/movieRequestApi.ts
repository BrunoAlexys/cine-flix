import axios from "axios";
import { PaginatedMediaResponse } from "../../type/paginatedMediaResponse";
import { MediaItem } from "../../type/mediaItem";
import { MediaResponse } from "../../type/mediaResponse";


const apiUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiUrl || !apiKey) {
    console.error('API URL or API Key not found');
}

const req = axios.create({
    baseURL: apiUrl
});

export const getTopMovies = async (): Promise<MediaItem[]> => {
    try {
        const response = await req.get<MediaResponse>("top_rated", {
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar os filmes mais bem avaliados:", error);
        throw error;
    }
};

export const getPopularMovies = async (): Promise<MediaItem[]> => {
    try {
        const response = await req.get<MediaResponse>("popular", {
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar os filmes mais populares:", error);
        throw error;
    }
};

export const getNowPlaying = async (): Promise<MediaItem[]> => {
    try {
        const response = await req.get<MediaResponse>("now_playing", {
            params: {
                api_key: apiKey,
                language: 'pt-BR'
            }
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar os filmes em exibição:", error);
        throw error;
    }
}

export const getPaginatedMovies = async (page: number): Promise<PaginatedMediaResponse> => {
    try {
        const response = await req.get<MediaResponse>('popular', {
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
        console.error("Erro ao buscar os filmes populares:", error);
        throw error;
    }
}

export const getMoviesGenere = async (idGenere: number): Promise<MediaItem[]> => {
    try {
        const response = await req.get<MediaResponse>('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: apiKey,
                language: 'pt-BR',
                with_genres: idGenere
            }
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar os filmes de ação:", error);
        throw error;
    }
}

export const searchMoviesByTitle = async (title: string): Promise<MediaItem[]> => {
    try {
        const response = await req.get<MediaResponse>('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: apiKey,
                language: 'pt-BR',
                query: title
            }
        })

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar os filmes pelo título:", error);
        throw error;
    }
}

