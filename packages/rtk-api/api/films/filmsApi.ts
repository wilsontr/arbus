import { Film } from "../../types/film"
import { emptySplitApi } from "../emptySplitApi"
import { Tags } from "../tags"
import { AddFilmResponse, GetFilmsApiResponse } from "./films.model"

export const filmsApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    addFilm: build.mutation<AddFilmResponse, Film>({
      query: (body) => ({
        url: "/api/film",
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Films],
    }),
    getFilms: build.query<GetFilmsApiResponse| undefined, void>({
      query: () => ({
        url: "/api/films",
        method: "GET"
      }),
      transformResponse: (response: GetFilmsApiResponse) => ({ 
        films: response.films
      }),
      providesTags: [Tags.Films],
    })
  }),
})
