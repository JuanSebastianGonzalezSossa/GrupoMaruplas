import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { useUiStore } from '../../hooks/useUiStore';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useServices } from '../../hooks/UseServices';
import { usePedidos } from '../../hooks/usePedidos';
import { useAuthStore } from '../../hooks/useAuthStore'


Modal.setAppElement('#root');

export const ModalFinalizarPedido = () => {

    const { isRutaOpen, closeRutaModal, openPedidoModal, total } = useUiStore();

    const { getRutas, getClientes } = useServices();

    const { addAcumulado } = useAuthStore();

    const { savingPedidos, clearOrder } = usePedidos();

    const { rutas } = useSelector(state => state.ruta);

    const { clientes } = useSelector(state => state.cliente);

    const { pedidos } = useSelector(state => state.pedido);

    useEffect(() => {
        getRutas();
        getClientes();
    }, [])

    const onCloseModal = () => {
        closeRutaModal();
    }

    const Anterior = () => {
        openPedidoModal();
    }

    const onSubmit = (values, actions) => {
        savingPedidos(values.cliente, values.ruta, new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COL' }).format(total), pedidos)
        addAcumulado(total)
        actions.resetForm();
        clearOrder();
        onCloseModal();
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, resetForm } = useFormik({
        initialValues: {
            ruta: '',
            cliente: '',
        },
        onSubmit
    });

    return (
        <Modal
            isOpen={isRutaOpen}
            onRequestClose={onCloseModal}
            className="modalPedido"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Pedido </Typography>
            <hr />

            <form onSubmit={handleSubmit} autoComplete='off' className='animate__animated animate__fadeIn animate__faster'>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">Ruta</InputLabel>
                                <Select
                                    sx={{ minWidth: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='ruta'
                                    value={values.ruta}
                                    label="ruta *"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.ruta && touched.ruta ? true : false}
                                    helperText={errors.ruta && touched.ruta ? errors.ruta : ""}
                                >
                                    {rutas.map((ruta, i) => (
                                        <MenuItem
                                            key={i}
                                            value={ruta}
                                        >
                                            {ruta.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                                <Select
                                    sx={{ minWidth: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='cliente'
                                    value={values.cliente}
                                    label="cliente *"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.cliente && touched.cliente ? true : false}
                                    helperText={errors.cliente && touched.cliente ? errors.cliente : ""}
                                >
                                    {clientes.map((client, i) => (
                                        <MenuItem
                                            key={i}
                                            value={client}
                                        >
                                            {client.nombres}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: '10px' }}  >
                    <Button onClick={() => Anterior()} sx={{
                        color: 'white',
                        backgroundColor: 'error.main',
                        ':hover': { backgroundColor: 'error.main', opacity: 0.5 }
                    }}>Anterior</Button>
                    <Button type="submit" sx={{
                        color: 'white',
                        backgroundColor: 'secondary.main',
                        ':hover': { backgroundColor: 'secondary.main', opacity: 0.5 }
                    }}>Guardar</Button>
                </Grid>
            </form>
        </Modal>
    )
}
