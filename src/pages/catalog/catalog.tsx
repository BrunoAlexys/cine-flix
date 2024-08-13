import { useParams } from 'react-router-dom';
import './catalog.css';
import { useEffect, useState } from 'react';
import { usePaginatedMovies } from '../../service/movies/queriesMovies';
import { usePaginatedTv } from '../../service/series/queriesSeries';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageDefalte from '../../assets/DeadpoolNotFound.png';

type CatalogType = {
    type: 'movies' | 'series';
}

export const Catalog = () => {

    const { type } = useParams<CatalogType>();
    const title = type === 'movies' ? 'Filmes' : 'Séries';

    const [page, setPage] = useState(1);

    const movies = usePaginatedMovies(page);
    const series = usePaginatedTv(page);

    const data = type === 'movies' ? movies.data : series.data;
    const apiImageUrl = import.meta.env.VITE_API_IMAGE;

    useEffect(() => {
        document.title = 'Cineflix | ' + title;
        setPage(1);
    }, [title, type]);

    { movies.isLoading || series.isLoading && <div className='loading'>Carregando...</div> }
    
    return (
        <div className='container-catalog'>
            <div className='catalog'>
                <h1>{title}</h1>
            </div>

            <div className='container-card'>
                {data &&
                    data.results.map(item => (
                        <div className='card' key={item.id}>
                            <Link to={`/avaliation/${type}/${item.id}`}>
                                <img src={item.poster_path !== null ? `${apiImageUrl}${item.poster_path}`: ImageDefalte} alt="" />
                            </Link>
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
                    onChange={(_, value) => setPage(value)}
                />
            </div>
        </div>
    );
}