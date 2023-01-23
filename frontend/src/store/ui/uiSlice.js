import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isSuccessOpen: false,
        isPedidoOpen: false,
        isRutaOpen: false,
        message: undefined,
        isNow: {},
        total: 0,
    },
    reducers: {
        onTotal: (state, { payload }) => {
            state.total = payload;
        },
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },
        onOpenPedido: (state) => {
            state.isPedidoOpen = true;
            state.isRutaOpen = false;
        },
        onClosePedido: (state) => {
            state.isPedidoOpen = false;
        },
        onOpenRuta: (state) => {
            state.isRutaOpen = true;
            state.isPedidoOpen = false;
        },
        onCloseRuta: (state) => {
            state.isRutaOpen = false;
        },
        onOpenSuccess: (state, { payload }) => {
            state.isSuccessOpen = true;
            state.message = payload;
        },
        onCloseSuccess: (state) => {
            state.isSuccessOpen = false;
            state.message = undefined;
        },
        onUpdateNow: (state, { payload }) => {
            state.isNow = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal, onOpenSuccess, onCloseSuccess, onUpdateNow, onOpenPedido, onClosePedido, onCloseRuta, onOpenRuta, onTotal } = uiSlice.actions;
