import { Developer } from "../../types"
import { emptySplitApi } from "../emptySplitApi"
import { Tags } from "../tags"
import { AddDeveloperResponse, DeleteDeveloperResponse, GetDevelopersApiResponse, UpdateDeveloperResponse } from "./developers.model"

export const developersApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    getDevelopers: build.query<GetDevelopersApiResponse | undefined, void>({
      query: () => ({
        url: "/api/developers",
        method: "GET"
      }),
      // transformResponse: (response: GetDevelopersApiResponse) => ({ 
      //   developers: response.developers
      // }),
      providesTags: [Tags.Developers],
    }),
    addDeveloper: build.mutation<AddDeveloperResponse, Developer>({
      query: (body) => ({
        url: "/api/developers",
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Developers],
    }),
    updateDeveloper: build.mutation<UpdateDeveloperResponse, Developer>({
      query: (film) => {
        const { id } = film;
        return ({
          url: `/api/developers/${id}`,
          method: "PUT",
          body: film,
        })
      },
      invalidatesTags: [Tags.Developers],
    }),
    deleteDeveloper: build.mutation<DeleteDeveloperResponse, number>({
      query: (filmId) => ({
        url: `/api/developers/${filmId}`,
        method: "DELETE",        
      }),
      invalidatesTags: [Tags.Developers],
    }),
  }),
})
