import { Box, Grid, IconButton, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react'
import { useUiStore } from '../../hooks/useUiStore';
import { ResponsiveDrawer } from '../components/sidebar'
import { ModalEditarRuta, ModalCrearRuta } from '../views/';
import { useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useDispatch, useSelector } from "react-redux"
import { NothingSelectedView } from '../components/NothingSelectedView';
import { AsesorGrid } from '../components/asesoresGrid'
import Swal from 'sweetalert2';
import { onRutas } from "../../store";
import { clearStateMessage } from '../../store';
import { TableComponent } from '../components/TableComponent';
import { useServices } from '../../hooks/UseServices';
import { columnas } from '../data/columnsRutas';
import { FaceRetouchingNaturalSharp } from '@mui/icons-material';

const api = "rutas";

export const Rutas = () => {

    const { openDateModal} = useUiStore();

    const { getRutas } = useServices();

    const { rutas } = useSelector(state => state.ruta);

    // const { message, isSuccessOpen } = useSelector(state => state.ui);

    const onOpenModal = () => {
        openDateModal();
    }

    useEffect(() => {
        getRutas();
    }, [])


    return (
        <Grid
            component="main"
            alignItems="flex-start"
            sx={{ display: 'flex', padding: 4, minHeight: '100%', minwidth: '100%', backgroundColor: 'primary.main', borderRadius: 3 }}
            className='animate__animated animate__fadeIn animate__faster'>
            <ResponsiveDrawer />

                {Object.keys(rutas).length === 0 ? <NothingSelectedView />
                    : <TableComponent columnas={columnas} filas={rutas} api={api}/>}
                
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

            <ModalEditarRuta/>
            <ModalCrearRuta/>
        </Grid>
    )
}