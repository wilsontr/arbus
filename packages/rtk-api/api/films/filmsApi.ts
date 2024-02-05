import { Film } from "../../types/film"
import { emptySplitApi } from "../emptySplitApi"
import { Tags } from "../tags"
import { AddFilmResponse, GetFilmsApiResponse, UpdateFilmResponse } from "./films.model"

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
    updateFilm: build.mutation<UpdateFilmResponse, Film>({
      query: (film) => {
        const { id } = film;
        return ({
          url: `/api/film/${id}`,
          method: "PUT",
          body: film,
        })
      },
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
