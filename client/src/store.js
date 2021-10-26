import {configureStore} from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import projectReducer from './redux/projectSlice'
import taskReducer from './redux/taskSlice'
import reservationReducer from './redux/reservationSlice'
import salleReducer from './redux/salleSlice'
import postReducer from './redux/postsSlice'
import messageReducer from "./redux/messageSlice";


const store = configureStore({reducer:{ message : messageReducer,user:userReducer,project:projectReducer,task:taskReducer,reservation:reservationReducer,salle:salleReducer,blogs:postReducer}})

export default store;