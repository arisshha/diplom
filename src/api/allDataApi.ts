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

// Mock данные для разработки (когда сервер недоступен)
const getMockData = (): AllDataResponse => {
  return {
    success: true,
    result: {
      halls: [
        {
          id: 1,
          hall_name: "Зал 1",
          hall_rows: 10,
          hall_places: 8,
          hall_config: [],
          hall_price_standart: 250,
          hall_price_vip: 350,
          hall_open: 1
        },
        {
          id: 2,
          hall_name: "Зал 2",
          hall_rows: 10,
          hall_places: 8,
          hall_config: [],
          hall_price_standart: 250,
          hall_price_vip: 350,
          hall_open: 1
        }
      ],
      films: [
        {
          id: 1,
          film_name: "Дюна: Часть вторая",
          film_description: "Эпическая научно-фантастическая драма о борьбе за власть в пустыне Арракис",
          film_duration: 166,
          film_origin: "USA",
          film_poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
        },
        {
          id: 2,
          film_name: "Оппенгеймер",
          film_description: "История создания атомной бомбы и человека, который изменил историю",
          film_duration: 180,
          film_origin: "USA",
          film_poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
        },
        {
          id: 3,
          film_name: "Killers of The Flower Moon",
          film_description: "Детективная история о преступлениях против коренных американцев в Оклахоме",
          film_duration: 206,
          film_origin: "USA",
          film_poster: "https://image.tmdb.org/t/p/w500/aZXHjmhSSGUshLEdgsNCTH9z7Ix.jpg"
        }
      ],
      seances: [
        { id: 1, seance_filmid: 1, seance_hallid: 1, seance_time: "10:00" },
        { id: 2, seance_filmid: 1, seance_hallid: 1, seance_time: "14:30" },
        { id: 3, seance_filmid: 2, seance_hallid: 2, seance_time: "11:00" },
        { id: 4, seance_filmid: 2, seance_hallid: 2, seance_time: "19:00" },
        { id: 5, seance_filmid: 3, seance_hallid: 1, seance_time: "16:00" }
      ]
    }
  };
};

export const allDataApi = {
  getAllData: async (): Promise<AllDataResponse> => {
    return getMockData();
  }
};
