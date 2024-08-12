import { SwiperProps, SwiperSlide } from 'swiper/react';
import { Slider } from '../slider/Slider';
import './Banner.css';
import { usePopularMovies } from '../../service/movies/queriesMovies';
import { Link } from 'react-router-dom';

export const Banner = () => {

    const settings: SwiperProps = {
        spaceBetween: 30,
        centeredSlides: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
        },

        navigation: true,
    };

    const apiImageUrl = import.meta.env.VITE_API_IMAGE;
    // Depois configurar para ficar como imagem de fundo do Banner
    const apiImageBackdrop = import.meta.env.VITE_API_IMAGE_BACKDROP;

    if (!apiImageUrl && !apiImageBackdrop) {
        console.error('API Image URL not found');
    }

    // Obtenha os dados do hook
    const movies = usePopularMovies();

    return (
        <section className='container__banner'>
            <div>
                <Slider settings={settings}>
                    {movies.isLoading && <div>Loading...</div>}
                    {movies.data && movies.data.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={`/avaliation/movies/${movie.id}`}>
                                <img src={`${apiImageUrl}${movie.poster_path}`} alt={movie.title} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </section>
    );
}