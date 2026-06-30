import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScreenAdjustPageState {
  value: boolean;
}

const initialState = { value: false } satisfies ScreenAdjustPageState as ScreenAdjustPageState

const screenAdjustPageSlice = createSlice({
  name: "screenAdjustPage",
  initialState,
  reducers: {
    toggleScreenAdjustPage(state) {
      state.value = !state.value
    }
  }
})

export const { toggleScreenAdjustPage } = screenAdjustPageSlice.actions
export default screenAdjustPageSlice.reducer