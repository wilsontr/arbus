import { Film } from "../../types/film"
import { emptySplitApi } from "../emptySplitApi"
import { GetFilmsApiResponse } from "./films.model"

export const filmsApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    addFilm: build.query<void, Film>({
      query: ({ name, speed, format }) => ({
        url: "/api/film",
        method: "POST",
      }),
    }),
    getFilms: build.query<Film[] | undefined, void>({
      query: () => ({
        url: "/api/films",
        method: "GET"
      }),
      transformResponse: (response: GetFilmsApiResponse) => response,
    })
  }),
})
