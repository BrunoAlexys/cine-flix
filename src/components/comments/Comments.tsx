import { Input } from '../input/input';
import styles from './Comments.module.css';
import Send from '../../assets/send.png';
import Boy from '../../assets/garoto.png';
import Girl from '../../assets/menina.png';
import { useState } from 'react';
import { CommentsList } from '../../data/CommentsList';
import SeeMore from '../../assets/ver-mais.png';

export const Comments = () => {

    const [visebleComments, setVisebleComments] = useState(3);

    const fetchMoreData = () => {
        setTimeout(() => {
            setVisebleComments(prevVisibleComments => prevVisibleComments + 3);
        }, 300)
    }

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
            {
                CommentsList.slice(0, visebleComments).map((comment, index) => (
                    <div key={index} className={styles.comment}>
                        <div className={styles.containerComment}>
                            <div className={styles.containerPerfil}>
                                <div className={styles.perfilSm}>
                                    <img className={styles.perfilImg} src={comment.img || Boy} alt="Imagem de perfil" />
                                </div>
                                <div className={styles.containerName}>
                                    <p className={styles.name}>{comment.name}</p>
                                </div>
                            </div>
                            <div className={styles.containerMensage}>
                                <p className={styles.mensage}>{comment.mensage}</p>
                            </div>
                        </div>
                    </div>
                ))}

            {visebleComments < CommentsList.length && (
                <div className={styles.loadMoreContainer}>
                    <button onClick={fetchMoreData} className={styles.loadMoreButton}>
                        <img src={SeeMore} alt="Icone do botão ver mais" width={30} height={30}/>
                        Ver mais
                    </button>
                </div>
            )}
        </div>
    );
}