import {configureStore} from "@reduxjs/toolkit";
import {membersActions, membersSlice} from "./membersSlice";
import {messagesActions, messagesSlice} from "./messagesSlice";
import {avatarsActions, avatarsSlice} from "./avatarsSlice";


export const store = configureStore({
    reducer: {
        members: membersSlice.reducer,
        avatars: avatarsSlice.reducer,
        messages: messagesSlice.reducer,
    }
});

export const actions = {
    members: membersActions,
    avatars: avatarsActions,
    messages: messagesActions,
};