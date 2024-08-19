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
import Person from '../../assets/person2.png';
import Logout from '../../assets/sair-do-usuario1.png'
import Setting from '../../assets/settings1.png'


type SearchResult = MediaItem;

export const Header = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [showMenu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const resultsRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenu((prev) => !prev); // Alterna o estado de exibição do menu
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenu(false); // Fecha o menu se clicar fora dele
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        setSearch('');
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
                <p>Gênero</p>
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
            {!showMenu && (
                <img onClick={toggleMenu} src={Perfil} alt="Perfil" />
            )}
            {showMenu && (
                <div ref={menuRef} className="menuAoClicar">
                    <img onClick={toggleMenu} src={Perfil} alt="Logo-perfil" />
                    <div className='linha'></div>
                    <ul>
                        <li>
                            <img src={Person} alt="Icon perfil" />
                            Login
                        </li>
                        <li>
                            <img src={Setting} alt="configurações" />
                            Settings
                        </li>
                        <li>
                            <img src={Logout} alt="Icon sair" />
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
        </header>
    );
}