import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface openFilterSectionState {
  value: string[];
}

const initialState = { value: ["volume", "chapter", "page"] } satisfies openFilterSectionState as openFilterSectionState

const openFilterSectionSlice = createSlice({
  name: "openFilterSection",
  initialState,
  reducers: {
    updateFilterSection(state, action: PayloadAction<string>) {
      state.value = state.value.includes(action.payload) ? state.value.filter((s) => s !== action.payload) : [...state.value, action.payload]
    }
  }
})

export const { updateFilterSection } = openFilterSectionSlice.actions
export default openFilterSectionSlice.reducer