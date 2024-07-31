import { Tv } from "./tv";

export type TvResponse = {
    page: number;
    results: Tv[];
    total_pages: number;
    total_results: number;
};