import { createSlice } from '@reduxjs/toolkit';

export const productoslice = createSlice({
    name: 'producto',
    initialState: {
        productos: {},
        pedidos: []
    },
    reducers: {
        onProductos: (state, { payload }) => {
            state.productos = payload
        },
        onAddNewProductos: ( state, { payload }) => {
            state.productos.push( payload );
        },
        onUpdateProductos: ( state, { payload } ) => {
            state.productos = state.productos.map(producto => {
                if (producto.id === payload.id) {
                    return payload;
                }

                return producto;
            });
        },
        onPedidos: (state, { payload }) => {
            state.pedidos = payload
        },
        onAddPedidos: (state, { payload }) => {
            state.pedidos.push(payload);
        },
        onDeletePedidos: (state, { payload }) => {
            state.pedidos = state.pedidos.filter(pedido => pedido.id != payload.id);
        },
    }
});


// Action creators are generated for each case reducer function
export const { onProductos, onUpdateProductos, onAddNewProductos, onPedidos, onAddPedidos, onDeletePedidos } = productoslice.actions;