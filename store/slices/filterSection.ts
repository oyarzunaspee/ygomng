import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSectionState {
  value: string;
}

const initialState = { value: "Volumes" } satisfies FilterSectionState as FilterSectionState

const filterSectionSlice = createSlice({
  name: "filterSection",
  initialState,
  reducers: {
    swapFilterSection(state, action: PayloadAction<string>) {
      state.value = action.payload
    }
  }
})

export const { swapFilterSection } = filterSectionSlice.actions
export default filterSectionSlice.reducer