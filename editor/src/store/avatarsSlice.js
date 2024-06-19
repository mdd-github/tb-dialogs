import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {defaultAvatar} from "../assets/images/default-avatar";

const INITIAL_STATE = {
    list: [{
        id: 0,
        content: defaultAvatar
    }]
};

const createAvatar = (() => {
    let idCounter = INITIAL_STATE.list.length + 1;

    return ({content = null}) => ({
        id: idCounter++,
        content
    });
})();

const remove = createAsyncThunk(
    'avatars/remove',
    async (avatarId, {getState, rejectWithValue}) => {
        if(avatarId === 0) {
            return rejectWithValue(`The default avatar cannot be deleted`);
        }

        const isAvatarInUse = getState().members.list.find((member) => (member.avatarId === avatarId)) != null;
        if(isAvatarInUse) {
            return rejectWithValue(`The avatar with ID = ${avatarId} is already in use`);
        }

        return avatarId;
    }
);

export const avatarsSlice = createSlice({
    name: 'avatars',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, {payload}) => {
            state.list = [
                ...state.list,
                createAvatar(payload),
            ];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(remove.fulfilled, (state, {payload: avatarId}) => {
                state.list = state.list.filter(({id}) => (avatarId !== id));
            })
            .addCase(remove.rejected, (state, {payload}) => {
                console.error(payload);
            });
    }
});

export const avatarsActions = {
    ...avatarsSlice.actions,
    remove
}