import { useDrag } from 'react-dnd';
import styles from './DraggableFilm.module.css';
import type { Film } from '../../../interfaces/Film.interface';
import deleteIcon from '../../../assets/Admin/delete-icon.svg';
import trashIcon from '../../../assets/Admin/trash-icon.svg';
import { resolveMediaUrl } from '../../../helpers/media';
import { useState } from 'react';

interface DraggableFilmProps {
    film: Film;
    backgroundColor: string;
    onDelete: (id: number) => void;
}

export const DraggableFilm = ({ film, backgroundColor, onDelete }: DraggableFilmProps) => {
    const [iconSrc, setIconSrc] = useState<string>(deleteIcon);
    const [fallbackText, setFallbackText] = useState<boolean>(false);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FILM',
        item: { id: film.id, film },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [film]);

    return (
        <div
            ref={drag as any}
            style={{ backgroundColor }}
            className={`${styles.film} ${isDragging ? styles.dragging : ''}`}
        >
            {film.film_poster ? (
                <img 
                    src={resolveMediaUrl(film.film_poster)} 
                    alt="постер фильма" 
                    className={styles['film-poster']}
                />
            ) : (
                <div 
                    className={styles['film-poster-placeholder']}
                    aria-label="Постер отсутствует"
                >
                    —
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.name}>{film.film_name}</div>
                <div className={styles.duration}>{film.film_duration ? `${Number(film.film_duration)} минут` : '—'}</div>
            </div>
            {fallbackText ? (
                <div
                    className={styles.icon}
                    role="button"
                    aria-label="Удалить фильм"
                    onClick={() => onDelete(film.id)}
                >
                    Удалить
                </div>
            ) : (
                <img 
                    src={iconSrc}
                    alt="иконка удаления" 
                    className={styles.icon} 
                    onClick={() => onDelete(film.id)}
                    onError={() => {
                        if (iconSrc !== trashIcon) {
                            setIconSrc(trashIcon);
                        } else {
                            setFallbackText(true);
                        }
                    }}
                />
            )}
        </div>
    );
};
