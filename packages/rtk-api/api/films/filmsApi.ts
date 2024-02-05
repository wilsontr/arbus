import { Film } from "../../types/film"
import { emptySplitApi } from "../emptySplitApi"
import { Tags } from "../tags"
import { AddFilmResponse, DeleteFilmResponse, GetFilmsApiResponse, UpdateFilmResponse } from "./films.model"

export const filmsApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    addFilm: build.mutation<AddFilmResponse, Film>({
      query: (body) => ({
        url: "/api/films",
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Films],
    }),
    updateFilm: build.mutation<UpdateFilmResponse, Film>({
      query: (film) => {
        const { id } = film;
        return ({
          url: `/api/films/${id}`,
          method: "PUT",
          body: film,
        })
      },
      invalidatesTags: [Tags.Films],
    }),
    deleteFilm: build.mutation<DeleteFilmResponse, number>({
      query: (filmId) => ({
        url: `/api/films/${filmId}`,
        method: "DELETE",        
      }),
      invalidatesTags: [Tags.Films],
    }),
    getFilms: build.query<GetFilmsApiResponse | undefined, void>({
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
