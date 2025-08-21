import { configureStore } from '@reduxjs/toolkit'
import students from './slices/students.slice'
import studentSelected from './slices/studentSelected.slice'


export default configureStore({
  reducer:{
    students,
    studentSelected,
  } 
})