import { Grid, IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useServices } from '../../hooks/UseServices'
import { useUiStore } from '../../hooks/useUiStore'
import { NothingSelectedView } from '../components/NothingSelectedView'
import { ResponsiveDrawer } from '../components/sidebar'
import { TableComponent } from '../components/TableComponent'
import { columnas } from '../data/columnsClientes'
import { ModalCrearCliente } from '../views/ModalCrearCliente';
import { ModalEditarCliente } from '../views/ModalEditarCliente';
import { ModalCrearRuta } from '../views/ModalCrearRuta';

const api = "customers";

export const Clientes = () => {

    const dispatch = useDispatch();

    const { openDateModal } = useUiStore();

    const { getClientes } = useServices();

    const { clientes } = useSelector(state => state.cliente);

    // const { message, isSuccessOpen } = useSelector(state => state.ui);

    const onOpenModal = () => {
        openDateModal();
    }

    useEffect(() => {
        getClientes();
    }, [])


    return (
        <Grid
            component="main"
            alignItems="flex-start"
            sx={{ display: 'flex', padding: 4, minHeight: '100%', minwidth: '100%', backgroundColor: 'primary.main', borderRadius: 3 }}
            className='animate__animated animate__fadeIn animate__faster'>
            <ResponsiveDrawer />

            {Object.keys(clientes).length === 0 ? <NothingSelectedView />
                : <TableComponent columnas={columnas} filas={clientes} api={api}/>}

            <IconButton
                size='large'
                sx={{
                    color: 'third.main',
                    backgroundColor: 'fifth.main',
                    ':hover': { backgroundColor: 'fifth.main', opacity: 0.8 },
                    position: 'fixed',
                    right: 50,
                    bottom: 30
                }}
                onClick={onOpenModal}
            >
                <AddOutlinedIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <ModalCrearCliente />
            <ModalEditarCliente />
        </Grid>
    )
}