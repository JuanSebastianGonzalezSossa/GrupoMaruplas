import { createSlice } from '@reduxjs/toolkit';

export const pedidoSlice = createSlice({
    name: 'pedido',
    initialState: {
        pedidos: []
    },
    reducers: {
        onpedidos: (state, { payload }) => {
            state.pedidos = payload
        },
        onAddNewPedidos: (state, { payload }) => {
            state.pedidos.push(payload);
        },
        onUpdatePedido: (state, { payload }) => {
            state.pedidos = state.pedidos.map(pedido => {
                if (pedido.id === payload.id) {
                    return payload;
                }

                return pedido;
            });
        },
        onDeletePedido: (state, { payload }) => {
            state.pedidos = state.pedidos.filter(pedido => pedido.id != payload.id);
        },
    }
});


// Action creators are generated for each case reducer function
export const { onpedidos, onAddNewPedidos, onUpdatePedido, onDeletePedido } = pedidoSlice.actions;