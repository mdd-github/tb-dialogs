import {configureStore} from "@reduxjs/toolkit";
import {membersSlice, membersSliceActions} from "./membersSlice";


export const store = configureStore({
    reducer: {
        members: membersSlice.reducer
    }
});

export const actions = {
    ...membersSliceActions
};