import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FormType, FilterParams } from "../../pages/filter/types";



const URL = import.meta.env.PUBLIC_ENV__BACKEND_URL

export const filterApi = createApi({
    reducerPath: "filterApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `api/v1/filter`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getFilterResults: builder.query<void, FilterParams>({
            query: ({tab, queryString}) => ({
                url: `/${tab}?${queryString}`,
                method: "GET"
            })
        })
    })
});


export const { 
    useLazyGetFilterResultsQuery
 } = filterApi