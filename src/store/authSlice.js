    //to track that user is logged in or not


    import { createSlice } from "@reduxjs/toolkit";

    // make initial state 
    const initialState = {
        status:false,//user is not authenticated
        userData:null
    }

    export const authSlice = createSlice ({
        name:'auth',
        initialState,
        reducers:{
            login:(state,action) => {
                state.status = true;//user is authenticated
                state.userData = action.payload;
            },
            logout:(state) => {
                state.status = false;
                state.userData = null;
            }
        }
    });

    export const {login,logout} = authSlice.actions       

    export default authSlice.reducer