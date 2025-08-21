import { createSlice } from "@reduxjs/toolkit"

export const studentSelectedSlice = createSlice({
  name: "studentSelected",
  initialState: null,
  reducers: {
    setStudentSelected: (state, action) => action.payload,
  },
})

export const { setStudentSelected } = studentSelectedSlice.actions

export default studentSelectedSlice.reducer
