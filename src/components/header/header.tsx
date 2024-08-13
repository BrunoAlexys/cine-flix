import { useState } from 'react';
import { Input } from '../input/input';
import './header.css';
import Logo from '../../assets/pipoca.png';
import Lupa from '../../assets/lupa.png';
import Perfil from '../../assets/perfil.png';
import { Link } from 'react-router-dom';

export const Header = () => {

    const [search, setSearch] = useState('');

    return (
        <header className='container'>
            <div className="logo">
                <Link to={`/`}><img className='logo' src={Logo} alt="Logo do site cine flix" /></Link>
            </div>
            <div className="menu">
                <p><Link style={{color: 'white'}} to={`/`}>Home</Link></p>
                <p><Link style={{color: 'white'}} to={`/catalog/movies`}>Filmes</Link></p>
                <p><Link style={{color: 'white'}} to={`/catalog/series`}>Séries</Link></p>
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
            </div>
            <div className="perfil">
                <img src={Perfil} alt="Perfil" />
            </div>
        </header>
    );
}