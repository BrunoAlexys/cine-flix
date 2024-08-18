import { useEffect, useRef, useState } from 'react';
import { Input } from '../input/input';
import './header.css';
import Logo from '../../assets/pipoca.png';
import Lupa from '../../assets/lupa.png';
import Perfil from '../../assets/perfil.png';
import { Link } from 'react-router-dom';
import { searchMoviesByTitle } from '../../service/movies/movieRequestApi';
import { MediaItem } from '../../type/mediaItem';
import { debounce } from 'lodash';
import { searchSeriesByTitle } from '../../service/series/serieRequestApi';


type SearchResult = MediaItem;

export const Header = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);

    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (query: string) => {
        try {
            const movieResult = await searchMoviesByTitle(query);
            const tvResults = await searchSeriesByTitle(query);

            // Adiciona a propriedade mediaType para cada item
            const movieResultsWithType = movieResult.map(item => ({
                ...item,
                mediaType: 'movies' as const,
            }));

            const tvResultsWithType = tvResults.map(item => ({
                ...item,
                mediaType: 'series' as const,
            }));

            // Combina os resultados e remove duplicados
            const combinedResults = [...movieResultsWithType, ...tvResultsWithType];

            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.id)))
                .map(id => combinedResults.find(item => item?.id === id))
                .filter((item): item is MediaItem => item !== undefined);


            let i = 1;

            uniqueResults.map(item => console.log(`Item ${i++}: ${item.id} - ${item.mediaType} - ${item.title || item.name}`));

            // Define os resultados na lista de resultados de busca
            setSearchResults(uniqueResults);
        } catch (error) {
            console.log('Erro na busca', error);
            throw error;
        }
    }

    const debouncedSearch = debounce((query: string) => {
        handleSearch(query);
    }, 800)


    const handleResultClick = () => {
        setShowResults(false);
    };

    useEffect(() => {
        if (search.trim() !== '') {
            debouncedSearch(search);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }

        return () => {
            debouncedSearch.cancel();
        }
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
                setShowResults(false);
                setSearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <header className='container'>
            <div className="logo">
                <Link to={`/`}><img className='logo' src={Logo} alt="Logo do site cine flix" /></Link>
            </div>
            <div className="menu">
                <p><Link style={{ color: 'white' }} to={`/`}>Home</Link></p>
                <p><Link style={{ color: 'white' }} to={`/catalog/movies`}>Filmes</Link></p>
                <p><Link style={{ color: 'white' }} to={`/catalog/series`}>Séries</Link></p>
                <p>Catálago</p>
            </div>
            <div className="pesquisa">
                <Input
                    type="text"
                    placeholder="Pesquisar"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className='input-com-lupa'
                />
                <img src={Lupa} alt="Lupa de pesquisa" />
                {showResults && (
                    <div className="search-results" ref={resultsRef}>
                        {searchResults.map(result => (
                            <div key={result.id} onClick={handleResultClick}>
                                <Link to={`/avaliation/${result.mediaType}/${result.id}`}>
                                    <p style={{ color: 'white' }}>{result.title || result.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="perfil">
                <img src={Perfil} alt="Perfil" />
            </div>
        </header>
    );
}