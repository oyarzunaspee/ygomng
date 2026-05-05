import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MaxNextChapterState {
  value: number;
}

const initialState = { value: 0 } satisfies MaxNextChapterState as MaxNextChapterState

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