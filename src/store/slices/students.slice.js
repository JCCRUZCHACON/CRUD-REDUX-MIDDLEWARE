import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "https://jsonplaceholder.typicode.com/users"

export const studentsSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload,
    addStudent: (state, action) => [...state, action.payload],
    deleteStudent: (state, action) =>
      state.filter((student) => student.id !== action.payload),
    updateStudent: (state, action) =>
      state.map((student) =>
        student.id === action.payload.id
          ? { ...student, ...action.payload }
          : student
      ),
  },
})

export const { setStudents, addStudent, deleteStudent, updateStudent } =
  studentsSlice.actions

export default studentsSlice.reducer

// -------------------
// THUNKS
// -------------------

// GET (Read)
export const getStudentsThunk = () => (dispatch) => {
  axios
    .get(BASE_URL) // Ojo: sin /users extra
    .then((res) => dispatch(setStudents(res.data)))
    .catch((err) => console.error(err))
}

// POST (Create)
export const createStudentThunk = (data) => (dispatch) => {
  axios
    .post(BASE_URL, data)
    .then((res) => {
      dispatch(addStudent(res.data))
    })
    .catch((err) => console.error(err))
}

// DELETE
export const deleteStudentThunk = (id) => (dispatch) => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then(() => dispatch(deleteStudent(id)))
    .catch((err) => console.error(err))
}

// PATCH (Update)
export const updateStudentThunk = (id, data) => (dispatch) => {
  axios
    .patch(`${BASE_URL}/${id}`, data)
    .then((res) => dispatch(updateStudent(res.data)))
    .catch((err) => console.error(err))
}
