import styles from './Seances.module.css'
import { NavLink } from 'react-router-dom';
import { useNavigation } from '../../hooks/useNavigation';
import { useAppData } from '../../hooks/useAppData';
import { parse } from 'date-fns';
import { resolveMediaUrl, placeholderPoster } from '../../helpers/media';


export function Seances () {
    const { films, seances, halls, loading, error } = useAppData();
    const { navigationData, setNavigationData} = useNavigation();

    interface FilmSchedule {
        film: typeof films[0];   
        seances: Array<{               
            seance: typeof seances[0];    
            hall: typeof halls[0];        
        }>;    
    }

    const seancesByFilm = seances.reduce((acc, seance) => {
        if (!acc[seance.seance_filmid]) {
            acc[seance.seance_filmid] = [];
        }
        acc[seance.seance_filmid].push(seance);
        return acc;
    }, {} as Record<number, typeof seances>);

    const schedule: FilmSchedule[] = films.filter((film) => {
        const filmSeances = seancesByFilm[film.id] || [];
        return filmSeances.length > 0;
        }).map(film => {
            const filmSeances = seancesByFilm[film.id] || [];
            const seancesWithHall = filmSeances.map(seance => {
                const hall = halls.find(h => h.id === seance.seance_hallid);
                return {seance, hall}
            })
                .filter((item): item is { seance: typeof seances[0]; hall: typeof halls[0] } => !!item.hall && item.hall.hall_open === 1)
                    .sort((a, b) => a.seance.seance_time.localeCompare(b.seance.seance_time))
                    return {
                        film,
                        seances: seancesWithHall
                    };
                        }).filter(item => item.seances.length > 0);

    const handleHallClickSeance  = (seance: typeof seances[0], film: typeof films[0]) => {

        setNavigationData(prev => ({
            ...prev,
            seance: seance,
            film: film,
        }))
    };

    const isSeancePassed = (seanceTime: string, selectedDate: string) => {
        if (!selectedDate) return false;
        
        const now = new Date();       
        const seanceDateTime = parse(
            `${selectedDate} ${seanceTime}`, 
            'yyyy-MM-dd HH:mm', 
            new Date()
        );
        
        // ЭТАП 3: Если текущее время >= время сеанса → disabled
        // Если текущее время < время сеанса → enabled
        return now >= seanceDateTime;
    };

    if (loading) {
        return <div className={styles.container}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.container}>Ошибка загрузки данных: {error}</div>;
    }

    if (schedule.length === 0) {
        return <div className={styles.container}>Нет доступных сеансов</div>;
    }

    return <div className={styles.container}>
        {schedule.map(({ film, seances }) => (
            <div className={styles.film}
            key={film.id}>
                <div className={styles.content}>
                    <img src={resolveMediaUrl(film.film_poster) || placeholderPoster} className={styles.poster} />
                    <div className={styles.info}>
                        <div className={styles.name}>{film.film_name}</div>
                        <div>{film.film_description}</div>
                        <div className={styles['second-info']}>
                            <div>{film.film_duration}&nbsp;минут</div>
                            <div>{film.film_origin}</div>
                        </div>
                    </div>
                </div>
                {Object.entries(
                    seances.reduce((acc, {seance, hall }) => {
                        if(!acc[hall.hall_name]) {
                            acc[hall.hall_name] = []
                        }
                        acc[hall.hall_name].push(seance);
                        return acc
                    }, {} as Record<string, typeof seances[0]['seance'][]>))
                .map(([hallName, hallSeances])  => (
                    <div key={hallName} className={styles.hall}>
                        <div className={styles['hall-name']}>{hallName}</div>
                        <div className={styles.seances}>    
                            {hallSeances
                                .sort((a, b) => a.seance_time.localeCompare(b.seance_time))
                                .map(seance => {
                                    const isPassed = navigationData.date ? isSeancePassed(seance.seance_time, navigationData.date) : false;
                                    return (
                                        <NavLink 
                                            to={navigationData.date && !isPassed
                                                ? `/hallconfig?seanceId=${seance.id}&date=${navigationData.date}`
                                                : '#'} 
                                            key={seance.id} 
                                            className={`${styles['seance-time']} ${isPassed ? styles['seance-time-disabled'] : ''}`}
                                            onClick={(e) => {
                                                if (!navigationData.date || isPassed) {
                                                    e.preventDefault();
                                                } else {
                                                    handleHallClickSeance(seance, film);
                                                }
                                            }}
                                        >
                                            {seance.seance_time}
                                        </NavLink>
                                    );
                                })
                            }
                        </div>    
                    </div>
                ))}
            </div>
        ))}
    </div>
}