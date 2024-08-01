import { SwiperProps } from 'swiper/react';
import './App.css'
import { Banner } from './components/banner/Banner'
import { ContentSlider } from './components/contentSlider/contentSlider'
import { useTopMovies } from './service/movies/queriesMovies'
import { useTv } from './service/series/queriesSeries';
import { useEffect } from 'react';

function App() {

  const movies = useTopMovies();
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
    document.title = 'Cineflex';
  },[]);

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
      />

    </div>
  )
}

export default App
