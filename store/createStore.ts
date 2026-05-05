export { createStore };

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PageContext } from "vike/types";

import jumpToChapterSlice from "./slices/jumpToChapter";
import pageMenuSlice from "./slices/pageMenu";
import maxNextChapterSlice from "./slices/maxNextChapter";

import { authApi } from "./api/authApi";
import { mangaApi } from "./api/mangaApi";

const reducer = combineReducers({
    [mangaApi.reducerPath]: mangaApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    pageMenu: pageMenuSlice,
    jumpToChapter: jumpToChapterSlice,
    maxNextChapter: maxNextChapterSlice
})


const createStore = (pageContext: PageContext) => {
  const preloadedState = pageContext.isClientSide && pageContext.redux ? pageContext.redux.ssrState : undefined

  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { pageContext }
        },
      }).concat(authApi.middleware, mangaApi.middleware),
  })
}