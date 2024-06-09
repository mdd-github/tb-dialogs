import {configureStore} from "@reduxjs/toolkit";
import {membersSlice} from "./membersSlice";


export const store = configureStore({
    reducer: {
        members: membersSlice.reducer
    }
});