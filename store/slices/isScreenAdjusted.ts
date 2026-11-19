import { createSlice } from "@reduxjs/toolkit";

interface IsScreenAdjustedState {
  value: boolean;
}

const initialState: IsScreenAdjustedState = { value: false }

const isScreenAdjustedSlice = createSlice({
  name: "isScreenAdjusted",
  initialState,
  reducers: {
    handleToggle(state) {
      state.value = !state.value
    }
  }
})

export const { handleToggle } = isScreenAdjustedSlice.actions
export default isScreenAdjustedSlice.reducer