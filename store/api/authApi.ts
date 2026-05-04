import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/auth",
        credentials: "include",
  }),
    endpoints: (builder) => ({
        login: builder.query<void, void>({
            query: () => ({
                url: "/twitter",
                method: "GET"
            })
        })
    })
});


export const { 
    useLoginQuery
 } = authApi