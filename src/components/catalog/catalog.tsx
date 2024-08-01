import { useParams } from 'react-router-dom';
import './catalog.css';
import { useEffect, useState } from 'react';
import { usePaginatedMovies } from '../../service/movies/queriesMovies';
import { usePaginatedTv } from '../../service/series/queriesSeries';
import { Pagination } from '@mui/material';

type CatalogType = {
    type: 'movies' | 'series' | 'realeases';
}

export const Catalog = () => {

    const { type } = useParams<CatalogType>();
    const title = type === 'movies' ? 'Filmes' : type === 'series' ? 'Séries' : 'Lançamentos';

    // const paginatedLimit = 18;
    const [page, setPage] = useState(1);

    const movies = usePaginatedMovies(page);
    const series = usePaginatedTv(page);

    const data = type === 'movies' ? movies.data : series.data;
    const apiImageUrl = import.meta.env.VITE_API_IMAGE;

    useEffect(() => {
        document.title = title;
        setPage(1);
    }, [title, type]);

    {movies.isLoading || series.isLoading && <div className='loading'>Carregando...</div>}
    return (
        <div className='container-catalog'>
            <div className='catalog'>
                <h1>{title}</h1>
            </div>
            
            <div className='container-card'>
                {data &&
                    data.results.map(item => (
                        <div className='card' key={item.id}>
                            <img src={`${apiImageUrl}${item.poster_path}`} />
                        </div>
                    ))
                }
            </div>
            <div className="container-paginated">
                <Pagination count={500} color={`primary`} sx={{
                    '.MuiPaginationItem-root': {
                        color: 'white', // Altera a cor dos números
                    },
                }}
                page={page} 
                onChange={(event, value) => setPage(value)}
                />
            </div>
        </div>
    );
}