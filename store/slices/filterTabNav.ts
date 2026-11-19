import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Tabs = "volumes" | "chapters" | "pages";

interface FilterTabNavState {
  value: "volumes" | "chapters" | "pages";
}

const initialState: FilterTabNavState = { value: "volumes" }

const filterTabNavSlice = createSlice({
  name: "filterTabNav",
  initialState,
  reducers: {
    changeFilterTab(state, action: PayloadAction<Tabs>) {
      state.value = action.payload
    }
  }
})

export const { changeFilterTab } = filterTabNavSlice.actions
export default filterTabNavSlice.reducer