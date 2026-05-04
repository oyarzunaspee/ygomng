import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListingState {
  value: boolean;
}

const initialState = { value: false } satisfies ListingState as ListingState

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    changeList(state, action: PayloadAction<boolean>) {
      state.value = action.payload
    }
  }
})

export const { changeList } = listingSlice.actions
export default listingSlice.reducer