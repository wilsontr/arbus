import { Film } from "../../types";

export interface AddFilmResponse {
  success: boolean;
  film_id: number;
}

export interface GetFilmsApiResponse {
  data?: Film[];
}