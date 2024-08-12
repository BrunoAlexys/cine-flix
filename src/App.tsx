import { SwiperProps } from 'swiper/react';
import './App.css'
import { Banner } from './components/banner/Banner'
import { ContentSlider } from './components/contentSlider/contentSlider'
import { useMoviesGenere, useTopMovies } from './service/movies/queriesMovies'
import { useTv } from './service/series/queriesSeries';
import { useEffect } from 'react';

function App() {

  const movies = useTopMovies();
  const moviesAcao = useMoviesGenere(28);
  const moviesComedia = useMoviesGenere(35);
  const tv = useTv();

  const settings: SwiperProps = {
    slidesPerView: 6,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  };

  const apiImageUrl = import.meta.env.VITE_API_IMAGE;

  if (!apiImageUrl) {
    console.error('API Image URL not found');
  }

  useEffect(() => {
    document.title = 'Cineflix';
  }, []);

  return (
    <div>
      <Banner />

      <ContentSlider
        title="Top Movies"
        data={movies.data}
        isLoading={movies.isLoading}
        settings={settings}
        keyExtractor={movie => movie.id}
        renderItem={movie => (
          <img src={`${apiImageUrl}${movie.poster_path}`} />
        )}
        type='movies'
      />

      <ContentSlider
        title="Melhores Séries"
        data={tv.data}
        isLoading={tv.isLoading}
        settings={settings}
        keyExtractor={tv => tv.id}
        renderItem={tv => (
          <img src={`${apiImageUrl}${tv.poster_path}`} />
        )}
        type='series'
      />

      <ContentSlider
        title="Ação"
        data={moviesAcao.data}
        isLoading={moviesAcao.isLoading}
        settings={settings}
        keyExtractor={movies => movies.id}
        renderItem={movie => (
          <img src={`${apiImageUrl}${movie.poster_path}`} />
        )}
        type='movies'
      />

      <ContentSlider
        title="Comédia"
        data={moviesComedia.data}
        isLoading={moviesComedia.isLoading}
        settings={settings}
        keyExtractor={movie => movie.id}
        renderItem={movie => (
          <img src={`${apiImageUrl}${movie.poster_path}`} />
        )}
        type='movies'
      />

    </div>
  )
}

export default App
