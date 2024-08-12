import { Input } from '../input/input';
import styles from './Comments.module.css';
import Send from '../../assets/send.png';
import Boy from '../../assets/garoto.png';
import Girl from '../../assets/menina.png';

export const Comments = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className={styles.titleText}>Comentários</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.perfil}>
                    <img className={styles.perfilImg} src={Boy} alt="Imagem de perfil" />
                </div>
                <div className={styles.commentSend}>
                    <Input
                        placeholder="Digite seu comentário aqui!"
                        type='text'
                        className={styles.input}
                    />
                    <button className={styles.send}><img src={Send} alt="Botão de enviar" /></button>
                </div>
            </div>
            <div className={styles.comment}>
                <div className={styles.containerComment}>
                    <div className={styles.containerPerfil}>
                        <div className={styles.perfilSm}>
                            <img className={styles.perfilImg} src={Boy} alt="Imagem de perfil" />
                        </div>
                        <div className={styles.containerName}>
                            <p className={styles.name}>José Marcos</p>
                        </div>
                    </div>
                    <div className={styles.containerMensage}>
                        <p className={styles.mensage}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo quam fugiat alias et. Tempore velit facere obcaecati quam quos porro molestias libero cupiditate quasi itaque, vel ipsum cumque excepturi ea!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}