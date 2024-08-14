import { MediaItem } from "./mediaItem";

export type PaginatedMediaResponse = {
    results: MediaItem[];
    totalPages: number;
}