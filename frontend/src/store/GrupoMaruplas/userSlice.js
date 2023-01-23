import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        state: '',
    },
    reducers: {
        onUser: ( state, { payload } ) => {
            state.users = payload,
            state.state = 'Trayendo Datos';
        },
        onAddNewUser: ( state, { payload }) => {
            state.users.push( payload );
            state.state = true;
        },
        clearStateMessage: ( state ) => {
            state.state = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onUser, onAddNewUser, clearStateMessage } = userSlice.actions;