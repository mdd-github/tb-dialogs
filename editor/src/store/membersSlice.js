import {createSlice} from "@reduxjs/toolkit";
import {defaultAvatar} from "../assets/images/default-avatar";


const initialState = {
    list: [{
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        description: 'Старший специалист',
        avatarId: 0
    }],
    avatars: [{
        id: 0,
        content: defaultAvatar
    }],
};

const createMember = (() => {
    let idCounter = 0;

    return ({
        firstName = 'Name',
        lastName = 'Surname',
        avatarId = 0,
        description = ''
    }) => ({
        id: idCounter++,
        firstName,
        lastName,
        avatarId,
        description
    });
})();

const createAvatar = (() => {
    let idCounter = 1;

    return ({content = null}) => ({
        id: idCounter++,
        content
    });
})();

export const membersSlice = createSlice({
    name: 'members',
    initialState: initialState,
    reducers: {
        addMember: (state, {payload}) => {
            console.log(payload)
            state.list = [
                ...state.list,
                createMember(payload)
            ];
        },
        removeMember: (state, {payload}) => {
            state.list = state.list.filter((member) => member.id !== payload.id);
        },
        updateMember: (state, {payload}) => {
            state.list = state.list.map((member) => {
                if (member.id !== payload.id) {
                    return member;
                }

                return payload;
            });

            console.log(payload, state.list);
        },

        addAvatar: (state, {payload}) => {
            state.avatars = [
                ...state.avatars,
                createAvatar(payload)
            ];
        },
        removeAvatar: (state, {payload}) => {
            state.avatars = state.avatars.filter((avatar) => avatar.id !== payload.id);
        }
    }
});

export const membersSliceActions  = membersSlice.actions;