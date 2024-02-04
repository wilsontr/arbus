import { Film } from "../../types";

export interface AddFilmResponse {
  success: boolean;
  id: number;
}

export interface GetFilmsApiResponse {
  films?: Film[];
}