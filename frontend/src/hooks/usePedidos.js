import { serviceMaruplas } from "../Apis";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewPedidos, onpedidos, onUpdatePedido, onDeletePedido, onAddPedidos, onPedidos, onDeletePedidos, onUpdateProductos } from "../store";
import { useUiStore } from "./useUiStore";
import Swal from "sweetalert2";

export const usePedidos = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const { closePedidoModal } = useUiStore();

    const { productos } = useSelector(state => state.producto);

    const { pedidos } = useSelector(state => state.pedido);

    const addToOrder = async (order) => {

        let ItemInCar = pedidos.find(
            pedido => pedido.id == order.id
        );

        console.log(ItemInCar)


        if (ItemInCar) {
            console.log('existe producto')
            pedidos.map(pedido =>
                (pedido.id == order.id && pedido.cantidad < order.stock)
                    ? console.log(pedido.cantidad, order.stock) + dispatch(onUpdatePedido({ ...pedido, cantidad: pedido.cantidad + 1 }))
                    : console.log('Paso algo', pedido.cantidad, order.cantidad)
            )
        } else {
            console.log('NO existe producto')
            console.log(order)
            dispatch(onAddNewPedidos({ ...order, cantidad: 1, stock: order.cantidad }))
        }
    }

    const RemoveOneFromOrder = (order) => {

        let itemDelete = pedidos.find(
            pedido => pedido.id == order.id
        );

        if (itemDelete.cantidad > 1) {
            pedidos.map(pedido =>
                pedido.id == order.id
                    ? dispatch(onUpdatePedido({ ...pedido, cantidad: pedido.cantidad - 1 }))
                    : console.log('Paso algo')
            )
        } else {
            dispatch(onDeletePedido({ ...order }))
            if (pedidos.length < 2) {
                console.log('entro')
                closePedidoModal();
            }
        }

    }

    const clearOrder = () => {

        dispatch(onpedidos([]));
        closePedidoModal();
    }

    const getPedidos = async () => {
        try {
            const { data } = await serviceMaruplas.get('/pedidos');
            console.log(data)
            dispatch(onPedidos(data.pedidos));
            return
        } catch (error) {
            console.log(error)
        }
    }



    const asyncFunction = async (prod, ped) => {
        // Código que utiliza await
        console.log(prod, ped)
        const result = await serviceMaruplas.put(`/products/uno/${prod.id}`, { cantidad: prod.cantidad - ped.cantidad });
        return result;
    }

    const addProducts = async (prod, ped) => {
        // Código que utiliza await
        console.log(prod, ped)
        const result = await serviceMaruplas.put(`/products/uno/${prod.id}`, { cantidad: prod.cantidad + ped.cantidad });
        return result;
    }

    const savingPedidos = async (cliente, ruta, total, order) => {
        console.log(cliente.nombres, ruta.nombre, order, total)
        console.log(productos)

        const results = await Promise.all(productos.map((prod => {
            order.map((ped => {
                prod.id == ped.id
                    ? asyncFunction(prod, ped) + dispatch(onUpdateProductos({ ...prod, cantidad: prod.cantidad - ped.cantidad }))
                    : console.log('No se encontro pedido relacionado al producto')
            }))
        })));

        console.log(results);

        try {
            // Creando
            const { data } = await serviceMaruplas.post('/pedidos', { Cliente: cliente.nombres, Productos: order, Ruta: ruta.nombre, precioTotal: total });

            console.log(order.cantidad, productos.cantidad);
            dispatch(onAddPedidos(data.pedido));
            if (data.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tu pedido fue guardado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }


    }

    const DeletingPedidos = async ({Productos, id}) => {
        console.log(Productos)
        console.log(productos)

        const results = await Promise.all(productos.map((prod => {
            Productos.map((ped => {
                prod.id == ped.id
                    ? addProducts(prod, ped) + dispatch(onUpdateProductos({ ...prod, cantidad: prod.cantidad + ped.cantidad }))
                    : console.log('No se encontro pedido relacionado al producto')
            }))
        })));

        try {
            const { data } = await serviceMaruplas.delete(`/pedidos/${id}`);
            console.log(data.pedidos)
            dispatch(onPedidos(data.pedidos));
            if (data.ok) {
                Swal.fire(
                    'Eliminado!',
                    'Tu pedido fue eliminado con exito!.',
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    return {
        //metodos
        addToOrder,
        RemoveOneFromOrder,
        clearOrder,
        getPedidos,
        savingPedidos,
        DeletingPedidos
    }


}
