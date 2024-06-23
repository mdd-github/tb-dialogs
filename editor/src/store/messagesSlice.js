import {createSlice} from "@reduxjs/toolkit";


const INITIAL_STATE = {
    list: [
        {
            id: 0,
            authorId: 0,
            content: 'First message!',

            userAction: null
        },
        {
            id: 1,
            authorId: 0,
            content: 'Second message!',

            userAction: {
                type: 'TEXT',
            }
        },
        {
            id: 2,
            authorId: 0,
            content: 'Hello, world!',

            userAction: {
                type: 'BUTTONS',
                buttons: [
                    {
                        id: 0,
                        content: 'Option 1'
                    },
                    {
                        id: 1,
                        content: 'Option 2'
                    }
                ]
            }
        },
        {
            id: 3,
            authorId: 0,
            content: 'First message!',

            userAction: null
        },
        {
            id: 4,
            authorId: 0,
            content: 'Second message!',

            userAction: {
                type: 'TEXT',
            }
        },
        {
            id: 5,
            authorId: 0,
            content: 'Hello, world!',

            userAction: {
                type: 'BUTTONS',
                buttons: [
                    {
                        id: 0,
                        content: 'Option 1'
                    },
                    {
                        id: 1,
                        content: 'Option 2'
                    }
                ]
            }
        }
    ]
};

const createMessage = (() => {
    let idCounter = INITIAL_STATE.list.length + 1;

    return ({authorId, content, userAction}) => ({
        id: idCounter++,
        authorId,
        content,
        userAction
    });
})();

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, { payload }) => {
            state.list = [
                ...state.list,
                createMessage(payload)
            ];
        },
        update: (state, { payload }) => {
            state.list = state.list.map((message) => {
                if (message.id !== payload.id) {
                    return message;
                }

                return payload;
            });
        },
        set: (state, { payload }) => {
            state.list = payload
        }
    }
});

export const messagesActions = {
    ...messagesSlice.actions
}