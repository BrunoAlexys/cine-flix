export type MediaItem = {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    // Propriedades específicas de Movie
    adult?: boolean;
    original_title?: string;
    popularity?: number;
    release_date?: string;
    title?: string;
    video?: boolean;
    // Propriedades específicas de Tv
    first_air_date?: string;
    name?: string;
    origin_country?: string[];
    original_name?: string;
    rating?: number;
};
