import { serviceMaruplas } from "../Apis";
import { useDispatch, useSelector } from "react-redux"
import { onClientes, onRutas, onAddNewRutas, onUpdateRutas, onAddNewCliente, onUpdateCliente, onProductos, onAddNewProductos } from "../store";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/FileUpload";

export const useServices = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const getClientes = async () => {
        try {
            const { data } = await serviceMaruplas.get('/customers');
            dispatch(onClientes(data.customers));
        } catch (error) {

            console.log(error)
        }
    }

    const savingClientes = async (values) => {
        console.log(values)
        try {
            if (values.id) {
                // Actualizando
                const { data } = await serviceMaruplas.put(`/customers/${values.id}`, values);
                console.log(values)
                const { ok, customer } = data;
                dispatch(onUpdateCliente({...customer, user}));
                if (ok) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El cliente fue actualizado con exito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                return;
            }
            // Creando
            const { data } = await serviceMaruplas.post('/customers', values);
            console.log(data);
            const { ok, customer } = data;
            dispatch(onAddNewCliente({...customer, user}));
            if (ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El cliente fue creado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }


    }

    const startDeletingClientes = async (values, api) => {
        try {
            const { data } = await serviceMaruplas.delete(`/${api}/${values.id}`);
            dispatch(onClientes(data.customers));
            console.log(data)
            if (data.ok) {
                Swal.fire(
                    'Eliminado!',
                    'El cliente fue eliminado con exito.',
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    const getRutas = async () => {
        try {
            const { data } = await serviceMaruplas.get('/rutas');
            console.log(data)
            dispatch(onRutas(data.rutas));
        } catch (error) {
            console.log(error)
        }
    }

    const savingRutas = async (values) => {
        console.log(values)
        try {
            if (values.id) {
                // Actualizando
                const { data } = await serviceMaruplas.put(`/rutas/${values.id}`, values);
                const { ok, ruta } = data;
                console.log(values)
                dispatch(onUpdateRutas({...ruta, user}));
                if (ok) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La ruta fue actualizada con exito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                return;
            }
            // Creando
            const { data } = await serviceMaruplas.post('/rutas', values);
            console.log(data);
            const { ok, ruta } = data;
            dispatch(onAddNewRutas({ ...ruta, user }));
            if (ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La ruta fue creada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }


    }

    const startDeletingRuta = async (values, api) => {
        try {
            const { data } = await serviceMaruplas.delete(`/${api}/${values.id}`);
            const { ok, rutas } = data;
            dispatch(onRutas(rutas));
            if (ok) {
                Swal.fire(
                    'Eliminado!',
                    'La ruta fue eliminada con exito!',
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    const getProductos = async () => {
        try {
            const { data } = await serviceMaruplas.get('/products');
            console.log(data)
            dispatch(onProductos(data.productos));
        } catch (error) {
            console.log(error)
        }
    }

    const savingProductos = async (values, file = []) => {

        try {
            const imagen = await fileUpload(file[0], 'maruplas');
            if (values.id) {
                // Actualizando
                const { data } = await serviceMaruplas.put(`/products/${values.id}`, values, imagen);
                console.log(data.productos)
                dispatch(onProductos(data.productos));
                if (data.ok) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El producto fue actualizado con exito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                return;
            }
            //Creando

            const { data } = await serviceMaruplas.post('/products', { nombre: values.nombre.toLowerCase(), imagenURL: `${imagen}`, cantidad: values.cantidad, precio: values.precio, descripcion: values.descripcion, referencia: values.referencia });

            dispatch(onAddNewProductos({ ...data.producto, user }));
            console.log(data.producto)
            if (data.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El producto fue creado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }


    }

    const DeletingProductos = async (values) => {
        try {
            const { data } = await serviceMaruplas.delete(`/products/${values.id}`);
            console.log(data)
            dispatch(onProductos(data.productos));
            if (data.ok) {
                Swal.fire(
                    'Elimniado!',
                    'El producto fue eliminado con exito.',
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
        getClientes,
        getRutas,
        savingRutas,
        startDeletingRuta,
        savingClientes,
        startDeletingClientes,
        getProductos,
        savingProductos,
        DeletingProductos
    }
}