import { Input } from '../input/input';
import styles from './Comments.module.css';
import Send from '../../assets/send.png';
import Boy from '../../assets/garoto.png';
import Girl from '../../assets/menina.png';

export const Comments = () => {
    return (
        <div className={styles.container}>
            <div className={styles.perfil}>
                <img className={styles.perfilImg} src={Girl} alt="Imagem de perfil" />
            </div>
            <div className={styles.comment}>
                <Input placeholder="Digite seu comentário aqui!" type='text'/>
                <button className={styles.send}><img src={Send} alt="Botão de enviar" /></button>
            </div>
        </div>
    );
}