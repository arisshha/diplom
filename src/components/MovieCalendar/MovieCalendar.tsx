import { addWeeks, eachDayOfInterval, format, isToday, startOfToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './MovieCalendar.module.css';
import { Seances } from '../Seances/Seances';
import { useNavigation } from '../../hooks/useNavigation';
import type { DateItem } from '../../interfaces/date.types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useEffect } from 'react';
import cn from 'classnames';

export function MovieCalendar () {
    
    const [searchParams] = useSearchParams();
    const activeSeance = searchParams.get('seance');
    const { setNavigationData, navigationData } = useNavigation();
    const sliderRef = useRef<Slider>(null);

    const getSeanceDate = () => {
        const today = startOfToday();
        const twoWeeksLater = addWeeks(today, 2);

        const dates = eachDayOfInterval({
            start: today,
            end: twoWeeksLater
        });

        return dates.map((date) => ({
            date,
            id: format(date, 'yyyy-MM-dd'),
            shortLabel: format(date, 'dd'),
            shortWeekDay: format(date, 'EEEEEE', {locale: ru}),
            isToday: isToday(date),
            isWeekend: ['сб', 'вс'].includes(format(date, 'EEEEEE', { locale: ru }))
        }));
    };

    const dates = getSeanceDate();
    
    useEffect(() => {
        if (dates.length > 0 && !navigationData.date) {
            const firstDate = dates[0];
            setNavigationData(prev => ({
                ...prev,
                date: firstDate.id           
            }));
        }
    }, [dates, navigationData.date, setNavigationData]);

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const dateActiveClick = (date: DateItem) => {
        setNavigationData(prev => ({
            ...prev,
            date: date.id           
        }));
    };

    return  <div>
                <nav className={styles.container}>
                    <div className={styles.calendarWrapper}>
                        <div className={styles.sliderContainer}>
                            <Slider ref={sliderRef} {...sliderSettings}>
                                {dates.map((date) => {
                                    const isActive = activeSeance === date.id || 
                                            (!activeSeance && dates[0]?.id === date.id);

                                    if(date.isToday) {
                                            return  (
                                                <div key={date.id} className={styles.slide}>
                                                    <NavLink 
                                                        key={date.id}
                                                        to={`?seance=${date.id}`}
                                                        className={cn(styles.date, { [styles['date-active']]: isActive })}
                                                        onClick={() => dateActiveClick(date)}>   
                                                            <div className={styles.todayTitle}>Сегодня</div>
                                                            <div className={styles.todayDate}>{date.shortWeekDay}, {date.shortLabel}</div>   
                                                    </NavLink>
                                                </div>);
                                        }    
                                    return  (<div key={date.id} className={styles.slide}>
                                        <NavLink 
                                                key={date.id}
                                                to={`?seance=${date.id}`}
                                                className={cn(styles.date, {
                                                    [styles['date-active']]: isActive,
                                                    [styles.weekend]: date.isWeekend
                                                })}
                                                onClick={() => dateActiveClick(date)}>
                                                
                                                    <div className={styles.weekDay}>{date.shortWeekDay},</div>
                                                    <div className={styles.dayNumber}>{date.shortLabel}</div>                   
                                        </NavLink> 
                                    </div>);
                                    })
                                }
                            </Slider>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => sliderRef.current?.slickNext()}>
                            ›
                        </div>
                    </div>
                </nav>            
                <div>
                    <Seances />
                </div>
            </div>;       
}