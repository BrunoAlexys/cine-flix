import { useEffect, useState } from 'react';
import { Input } from '../input/input';
import './header.css';
import Logo from '../../assets/pipoca.png';
import Lupa from '../../assets/lupa.png';
import Perfil from '../../assets/perfil.png';
import { Link } from 'react-router-dom';
import { searchMoviesByTitle } from '../../service/movies/movieRequestApi';
import { MediaItem } from '../../type/mediaItem';


type SearchResult = MediaItem;

export const Header = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async (query: string) => {
        try {
            const movies = await searchMoviesByTitle(query);
            const tvs = await searchMoviesByTitle(query);
            const results: SearchResult[] = [...movies, ...tvs];
            setSearchResults(results);
        } catch (error) {
            console.log('Erro na busca', error);
            throw error;
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(search);
            setShowResults(false);
        }
    }

    const handleResultClick = () => {
        setShowResults(false);
    };

    useEffect(() => {
        if (search.trim() !== '') {
            handleSearch(search);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [search]);

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
                    onKeyDown={handleKeyDown}
                />
                <img src={Lupa} alt="Lupa de pesquisa" />
                {showResults && (
                    <div className="search-results">
                        {searchResults.map(result => (
                            <div key={result.id} onClick={handleResultClick}>
                                <p>{result.title || result.name}</p>
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