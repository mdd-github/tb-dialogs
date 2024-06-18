import {configureStore} from "@reduxjs/toolkit";
import {membersSlice} from "./membersSlice";
import {messagesSlice} from "./messagesSlice";


export const store = configureStore({
    reducer: {
        members: membersSlice.reducer,
        messages: messagesSlice.reducer,
    }
});

export const actions = {
    members: {...membersSlice.actions},
    messages: {...messagesSlice.actions}
};