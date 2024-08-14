import { MediaItem } from "./mediaItem";

export type MediaResponse = {
    page?: number;          // Opcional, pode não estar presente em todas as respostas
    results: MediaItem[];   // Array de itens de mídia
    total_pages: number;   // Total de páginas disponíveis
    total_results: number; // Total de resultados encontrados
};