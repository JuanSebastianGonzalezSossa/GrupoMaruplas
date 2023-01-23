import { createSlice } from '@reduxjs/toolkit';

export const rutaSlice = createSlice({
    name: 'ruta',
    initialState: {
        rutas: [],
    },
    reducers: {
        onRutas: (state, { payload }) => {
            state.rutas = payload
        },
        onAddNewRutas: ( state, { payload }) => {
            state.rutas.push( payload );
        },
        onUpdateRutas: ( state, { payload } ) => {
            state.rutas = state.rutas.map(ruta => {
                if (ruta.id === payload.id) {
                    return payload;
                }

                return ruta;
            });
        },
    }
});


// Action creators are generated for each case reducer function
export const { onRutas, onUpdateRutas, onAddNewRutas } = rutaSlice.actions;