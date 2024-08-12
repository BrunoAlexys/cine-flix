import { Link } from "react-router-dom";
import "./footer.css";
import Logo from '../../assets/pipoca.png';

const Rodape = () => {
    return (
        <div className="footer">
            <div className="linha"></div>
            <div className="navegacao">
                <div className="logo">
                    <Link to={`/`}><img src={Logo} alt="Logo do site cine flix" /></Link>
                </div>
                <div className="geral">
                    <h2>Geral</h2>
                    <li>Filmes</li>
                    <li>Séries</li>
                    <li>Lançamentos</li>
                    <li>Ajuda</li>
                </div>
                <div className="conta">
                    <h2>Sua Conta</h2>
                    <li>Perfil</li>
                    <li>Favoritos</li>
                    <li>Feedback</li>
                    <li>Termos da conta</li>
                </div>
                <div className="termos mr">
                    <h2>Termos de Privacidade</h2>
                    <li>Uso Legal</li>
                    <li>Termos</li>
                </div>
            </div>
            <div className="rodape-direitos">
                © Cineflix 2024 - Todos os direitos reservados
            </div>
        </div>
    )
}

export default Rodape;
