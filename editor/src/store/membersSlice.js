import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    list: [],
    avatars: [],
};

const createMember = (() => {
    let idCounter = 0;

    return ({firstName = 'Name', lastName = 'Surname', avatarId = 0}) => ({
        id: idCounter++,
        firstName,
        lastName,
        avatarId
    });
})();

const createAvatar = (() => {
    let idCounter = 0;

    return ({content = null}) => ({
        id: idCounter++,
        content
    });
})();

export const membersSlice = createSlice({
    name: 'members',
    initialState: initialState,
    reducers: {
        addMember: (state, newMember) => {
            state.list = [
                ...state.list,
                createMember(newMember)
            ];
        },
        removeMember: (state, {id}) => {
            state.list = state.list.filter((member) => member.id !== id);
        },
        updateMember: (state, updatedMember) => {
            state.list = state.list.map((member) => {
                if (member.id !== updatedMember.id) {
                    return member;
                }

                return updatedMember;
            });
        },

        addAvatar: (state, newAvatar) => {
            state.avatars = [
                ...state.avatars,
                createAvatar(newAvatar)
            ];
        },
        removeAvatar: (state, {id}) => {
            state.avatars = state.avatars.filter((avatar) => avatar.id !== id);
        }
    }
});

const {
    addMember,
    removeMember,
    updateMember,
    addAvatar,
    removeAvatar
} = membersSlice.actions;