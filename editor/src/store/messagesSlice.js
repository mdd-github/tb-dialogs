import {createSlice} from "@reduxjs/toolkit";


const initialState = {
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

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

    }
});

export const messagesActions = {
    ...messagesSlice.actions
}