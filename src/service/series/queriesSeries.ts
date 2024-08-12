import { useQuery } from "@tanstack/react-query";
import { getPaginatedTv, getTv } from "./serieRequestApi";

export const useTv = () => {
    return useQuery ({
    queryKey: ['tvPopular'],
    queryFn: getTv,
    });
}

export const usePaginatedTv = (page: number) => {
    return useQuery ({
    queryKey: ['paginatedTv', page],
    queryFn: () => getPaginatedTv(page),
    });
}
