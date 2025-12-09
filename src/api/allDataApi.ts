import axios from "axios";
import { PREFIX } from "../helpers/API";
import type { SeatType } from "../interfaces/Hall.interface";

export interface AllDataResponse {
    success: boolean;
    result: {
        halls: Array<{
            id: number;
            hall_name: string;
            hall_rows: number;
            hall_places: number;
            hall_config: SeatType[][];
            hall_price_standart: number;
            hall_price_vip: number;
            hall_open: 0 | 1;
        }>;
        films: Array<{
            id: number;
            film_name: string;
            film_description: string;
            film_duration: number;
            film_poster: string;
            film_origin: string;
        }>;
        seances: Array<{
            id: number;
            seance_filmid: number;
            seance_hallid: number;
            seance_time: string;
        }>;
    };
}

export const allDataApi = {
    getAllData: async (): Promise<AllDataResponse> => {
        const response = await axios.get(`${PREFIX}/alldata`);
        const data = response.data;
        
        // ЭТАП 2: Берем первые 3 фильма с сервера и обновляем их данные
        // Сохраняем оригинальные ID чтобы сеансы остались привязанными
        const originalFilms = data.result.films || [];
        const filmsToKeep = originalFilms.slice(0, 3); // Берем первые 3 фильма
        
        if (filmsToKeep.length === 0) {
            // Если фильмов нет на сервере, возвращаем данные как есть
            return data;
        }
        
        // Обновляем данные первых 3 фильмов, сохраняя их оригинальные ID
        const customFilms = filmsToKeep.map((film: AllDataResponse['result']['films'][0], index: number) => {
            const newData = [
                {
                    film_name: "Дюна: Часть вторая",
                    film_description: "Эпическая научно-фантастическая драма о борьбе за власть в пустыне Арракис",
                    film_duration: 166,
                    film_origin: "USA",
                    film_poster: "/Client/posters/movie_duna.jpg"
                },
                {
                    film_name: "Оппенгеймер",
                    film_description: "История создания атомной бомбы и человека, который изменил историю",
                    film_duration: 180,
                    film_origin: "USA",
                    film_poster: "/Client/posters/movie_opengemer.jpg"
                },
                {
                    film_name: "Killers of The Flower Moon",
                    film_description: "Детективная история о преступлениях против коренных американцев в Оклахоме",
                    film_duration: 206,
                    film_origin: "USA",
                    film_poster: "/Client/posters/movie_killer.jpg"
                }
            ];
            
            return {
                ...film, // Сохраняем оригинальный ID и другие поля
                ...newData[index] // Перезаписываем данными нового фильма
            };
        });
        
        // Получаем ID фильмов которые оставляем
        const keptFilmIds = customFilms.map((f: AllDataResponse['result']['films'][0]) => f.id);
        
        // Обновляем фильмы в ответе - оставляем только первые 3 с обновленными данными
        return {
            ...data,
            result: {
                ...data.result,
                films: customFilms,
                // Оставляем только сеансы для фильмов которые мы оставили
                seances: data.result.seances.filter((seance: AllDataResponse['result']['seances'][0]) => 
                    keptFilmIds.includes(seance.seance_filmid)
                )
            }
        };
    }
}