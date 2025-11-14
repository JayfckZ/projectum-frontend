import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '../../app/store'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
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
