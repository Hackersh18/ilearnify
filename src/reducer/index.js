import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slice/authSlice.js"
import cartReducer from "../slice/cartSlice.js"
import courseReducer from "../slice/courseSlice.js"
import profileReducer from "../slice/profileSlice.js"
import viewCourseReducer from "../slice/viewCourseSlice.js"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  course: courseReducer,
  cart: cartReducer,
  viewCourse: viewCourseReducer,
})


export default rootReducer
