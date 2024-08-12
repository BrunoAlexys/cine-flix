import { useQuery } from "@tanstack/react-query";
import { getMoviesGenere, getNowPlaying, getPaginatedMovies, getPopularMovies, getTopMovies } from "./movieRequestApi";

export const useTopMovies = () => {
    return useQuery({
        queryKey: ['topMovies'],
        queryFn: getTopMovies,
    });
}

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['popularMovies'],
        queryFn: getPopularMovies,
    });
}

export const useNowPlaying = () => {
    return useQuery({
        queryKey: ['nowPlaying'],
        queryFn: getNowPlaying,
    });
}

export const usePaginatedMovies = (page: number) => {
    return useQuery({
        queryKey: ['paginatedMovies', page],
        queryFn: () => getPaginatedMovies(page),
    });
}

export const useMoviesGenere = (idGenere: number) => {
    return useQuery({
        queryKey: ['moviesAcao', idGenere],
        queryFn: () => getMoviesGenere(idGenere),
    });
}
