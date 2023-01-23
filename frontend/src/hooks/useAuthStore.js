import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { serviceMaruplas } from "../Apis";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onClientes, onRutas, onProductos, onPedidos, onUser, onAddNewUser, onpedidos, onTotal, onUpdateNow  } from "../store";
import { onOpenSuccess, onCloseSuccess } from "../store/ui/uiSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const { users } = useSelector(state => state.user)
    
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await serviceMaruplas.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid, rol: data.rol}));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async (values) => {

        try {
            const { data } = await serviceMaruplas.post('/auth/new', values );
            console.log(data)
            dispatch(onAddNewUser({...data.usuario, user }));
            if(data.ok){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El usuario se registro con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeletingAsesor = async (values, api) => {
        try {
            const { data } = await serviceMaruplas.delete(`/${api}/${values._id}`);
            console.log(data)
            dispatch(onUser(data.usuarios));
            if (data.ok) {
                Swal.fire(
                    'Eliminado!',
                    'El usuario se elimino con exito.',
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    const savingUsuarios = async (values) => {
        console.log(values)
        try {
            if (values._id) {
                // Actualizando
                const { data } = await serviceMaruplas.put(`/auth/${values._id}`, values);
                console.log(data)
                dispatch(onUser(data.usuarios));
                if (data.ok) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El usuario se actualizo con exito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                return;
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const asyncFunction = async (precioTotal, acum) => {
        // Código que utiliza await
        console.log(precioTotal, acum)
        const { data } = await serviceMaruplas.put(`/auth/${user.uid}`, { acumulado: precioTotal + acum });
        dispatch(onUser(data.usuarios));
        console.log(data)
        return data
    }

    const addAcumulado = async (precioTotal) => {

        const results = await Promise.all(users.map((us => {
                us._id == user.uid
                    ? asyncFunction(precioTotal, us.acumulado)
                    : console.log('No se encontro pedido relacionado al producto')
            })))

    }

    const asyncFunctionRemove = async (precioTotal, acum) => {
        // Código que utiliza await
        console.log(precioTotal, acum)
        const { data } = await serviceMaruplas.put(`/auth/${user.uid}`, { acumulado: acum - precioTotal});
        dispatch(onUser(data.usuarios));
        console.log(data)
        return data
    }

    const removeAcumulado = async (precioTotal) => {

        const results = await Promise.all(users.map((us => {
                us._id == user.uid
                    ? asyncFunctionRemove(precioTotal, us.acumulado)
                    : console.log('No se encontro pedido relacionado al producto')
            })))

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await serviceMaruplas.get('auth/ren ew')
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            console.log(data)
            dispatch(onLogin({ name: data.name, uid: data.uid, rol: data.rol }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch(onClientes([]));
        dispatch(onRutas([]));
        dispatch(onProductos({}));
        dispatch(onPedidos([]));
        dispatch(onpedidos([]));
        dispatch(onUser([]));
        dispatch(onTotal(0));
        dispatch(onUpdateNow({}));
    }

    //Propiedades
    return {
        status,
        user,
        errorMessage,

        //metodos
        startLogin,
        checkAuthToken,
        startLogout,
        startRegister,
        startDeletingAsesor,
        savingUsuarios,
        addAcumulado,
        removeAcumulado

    }

}