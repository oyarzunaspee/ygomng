import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageMenuType = {
  open: boolean;
  compare: boolean;
  isFetching: boolean;
}

interface PageMenuState {
  value: PageMenuType
}

const initialState = { value: {open: false, compare: false, isFetching: false} } satisfies PageMenuState as PageMenuState

const pageMenuSlice = createSlice({
  name: "openPageMenu",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.value.open = !state.value.open
    },
    closeScreen(state) {
      state.value.open = false
    },
    toggleCompare(state) {
      state.value.compare = !state.value.compare
    },
    closeCompare(state) {
      state.value.compare = false
    },
    updateFetching(state, action: PayloadAction<boolean>) {
      state.value.isFetching = action.payload
    }
  }
})

export const { 
    toggleMenu, 
    closeScreen, 
    toggleCompare, 
    closeCompare, 
    updateFetching } = pageMenuSlice.actions
export default pageMenuSlice.reducer