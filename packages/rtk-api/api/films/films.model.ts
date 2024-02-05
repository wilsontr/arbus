import { Film } from "../../types";

export interface AddFilmResponse {
  success: boolean;
  id: number;
}

export interface GetFilmsApiResponse {
  films?: Film[];
}

export interface UpdateFilmResponse {
  success: boolean;
}