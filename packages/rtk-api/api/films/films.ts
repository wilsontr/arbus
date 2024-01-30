import { Film } from "../../types/film"
import { emptySplitApi } from "../emptySplitApi"

const filmsApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    addFilm: build.query<void, Film>({
      query: ({ name, speed, format }) => ({
        url: "/api/films",
        method: "POST",
      }),
    }),
  }),
})
