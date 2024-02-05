import { Film } from "../../types";

export interface BaseFilmResponse {
  success: boolean;
}

export interface AddFilmResponse extends BaseFilmResponse {
  id: number;
}

export interface GetFilmsApiResponse {
  films?: Film[];
}

export interface UpdateFilmResponse extends BaseFilmResponse {}

export interface DeleteFilmResponse extends BaseFilmResponse {
  
}