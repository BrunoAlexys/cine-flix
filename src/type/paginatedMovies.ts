import { Movie } from "./movie";

export type PaginatedMoviesResponse = {
    results: Movie[];
    totalPages: number;
}