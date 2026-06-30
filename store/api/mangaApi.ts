import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ComparisonResponse } from "../types";
import type { VolumeResponse } from "../../pages/@edition/types";


type VolumeParams = {
    bunkoban?: boolean;
}

type ChapterParams = VolumeParams & {
    chap_num: number;
}

export const mangaApi = createApi({
    reducerPath: "mangaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/manga",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getVolumes: builder.query<VolumeResponse, VolumeParams>({
            query: ({ bunkoban }) => ({
                url: `?bunkoban=${bunkoban}`,
                method: "GET"
            })
        }),
        getComparePages: builder.query<ComparisonResponse, ChapterParams>({
            query: ({ bunkoban, chap_num}) => ({
                url: `/${chap_num}/compare?bunkoban=${bunkoban}`,
                method: "GET"
            })
        })
    })
});


export const { 
    useLazyGetVolumesQuery,
    useLazyGetComparePagesQuery
 } = mangaApi