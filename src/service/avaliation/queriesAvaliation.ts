import { useQuery } from "@tanstack/react-query";
import { getAvaliation } from "./avaliationRequest";

export const useGetAvaliation = (id: number, type: 'movies' | 'series') => {
    return useQuery({
        queryKey: ['moviesId', id],
        queryFn: () => getAvaliation(id, type),
    });
}
