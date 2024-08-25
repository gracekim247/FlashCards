import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
  
export const apiSlice = createApi({
   reducerPath: 'api', 
   //jsonplaceholder url doesn't have POST request
   baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
   tagTypes: ['FlashCards'],
   endpoints: (builder) => ({
      getFlashCards: builder.query({
         query: () => '/posts',  //url=jsonplaceholder.typicode.com/posts
         providesTags: ['FlashCards'],
      })
   })
})

export const{
   useGetFlashCardsQuery, 
} = apiSlice