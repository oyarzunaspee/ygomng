import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JumpToChapterState {
  value: boolean;
}

const initialState: JumpToChapterState = { value: false }

const jumpToChapterStateSlice = createSlice({
  name: "jumpToChapter",
  initialState,
  reducers: {
    toggleJumpTo(state, action: PayloadAction<boolean>) {
      state.value = action.payload
    }
  }
})

export const { toggleJumpTo } = jumpToChapterStateSlice.actions
export default jumpToChapterStateSlice.reducer