import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api'
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects/',
      providesTags: ['Project']
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: '/projects/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Project']
    })
  })
})

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi
