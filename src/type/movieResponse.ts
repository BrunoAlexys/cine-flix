import { Movie } from "./movie";

export type MovieResponse = {
    results: Movie[];
    total_pages: number;
} 