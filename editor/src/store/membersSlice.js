import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    list: [{
        id: 0,
        firstName: 'Иван',
        lastName: 'Иванов',
        description: 'Старший специалист',
        avatarId: 0
    }]
};

const createMember = (() => {
    let idCounter = INITIAL_STATE.list.length + 1;

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

export const membersSlice = createSlice({
    name: 'members',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, {payload}) => {
            state.list = [
                ...state.list,
                createMember(payload)
            ];
        },
        remove: (state, {payload}) => {
            state.list = state.list.filter((member) => member.id !== payload.id);
        },
        update: (state, {payload}) => {
            state.list = state.list.map((member) => {
                if (member.id !== payload.id) {
                    return member;
                }

                return payload;
            });
        },
        set: (state, { payload }) => {
            state.list = payload
        }
    }
});

export const membersActions = {
    ...membersSlice.actions
}