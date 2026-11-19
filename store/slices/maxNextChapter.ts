import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MaxNextChapterState {
  value: number;
}

const initialState: MaxNextChapterState = { value: 0 }

const maxNextChapterStateSlice = createSlice({
  name: "maxNextChapter",
  initialState,
  reducers: {
    setLastChapter(state, action: PayloadAction<number>) {
      state.value = action.payload
    }
  }
})

export const { setLastChapter } = maxNextChapterStateSlice.actions
export default maxNextChapterStateSlice.reducer