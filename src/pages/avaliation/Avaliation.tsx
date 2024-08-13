import { useParams } from 'react-router-dom';
import './Avaliation.css';
import { useGetAvaliation } from '../../service/avaliation/queriesAvaliation';
import Listar from '../../assets/tarefa.png';
import Curtir from '../../assets/salvar.png';
import Favorito from '../../assets/coração.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect } from 'react';
import { Comments } from '../../components/comments/Comments';
import ImageDefaulte from '../../assets/DeadpoolNotFound.png';


export const Avaliation = () => {

    const { id, type } = useParams<{ id: string, type: string }>();

    const avaliation = useGetAvaliation(Number(id), type as 'movies' | 'series');
    const apiImageUrl = import.meta.env.VITE_API_IMAGE;

    const voteAverage = Number(avaliation.data?.vote_average) * 10;
    console.log(avaliation.data);

    useEffect(() => {
        document.title = 'Cineflix | ' + (avaliation.data?.title ?? avaliation.data?.name);
    }, [avaliation.data?.title, avaliation.data?.name]);

    const poster =  avaliation.data?.poster_path !== null  ?  `${apiImageUrl}${avaliation.data?.poster_path}`: ImageDefaulte ;

    return ( 
        <div>
            <div className='container-avaliation'>
                <div className='container-poster'>
                    <img src={poster} alt={avaliation.data?.title} />
                </div>
                <div className='container-description'>
                    <div className='container-desc'>
                        <div className='container-title'>
                            <h1>{avaliation.data?.title || avaliation.data?.name}</h1>
                        </div>
                        <div className='container-actions'>
                            <div style={{ width: 60, height: 60 }}>
                                <CircularProgressbar value={voteAverage} text={`${voteAverage.toFixed(2)} %`} styles={buildStyles({ pathColor: '#21D07A', textColor: '#fff', textSize: '18px' })} />
                            </div>
                            <div className='action'><img src={Listar} alt="Icone de ação de listar" /></div>
                            <div className='action'><img src={Curtir} alt="Icone de ação dos favoritos" /></div>
                            <div className='action'><img src={Favorito} alt="Icone de ação de curtir" /></div>
                        </div>
                    </div>
                    <div className='container-sinopse'>
                        <h2>Sinopse</h2>
                        <p className='sinopse-text'>{avaliation.data?.overview || 'Oops! A sinopse decidiu tirar um dia de folga. Volte mais tarde para ver se ela voltou! 😄'}</p>
                    </div>
                </div>
            </div>
            <div className='container-line'>
                <div className='line'></div>
            </div>
            <Comments />
        </div>
    );
}