import { Tv } from "./tv";

export type PaginatedSeriesResponse = {
    results: Tv[];
    totalPages: number;
}