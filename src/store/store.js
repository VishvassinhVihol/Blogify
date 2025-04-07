import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'; //import authSlice

const store = configureStore({
    reducer: {
       auth: authReducer//important line
    }
})

export default store