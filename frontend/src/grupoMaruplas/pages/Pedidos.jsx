import { Grid} from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { usePedidos } from '../../hooks/usePedidos'
import { useServices } from '../../hooks/UseServices'
import { NothingSelectedView } from '../components/NothingSelectedView'
import {ResponsiveDrawer} from '../components/sidebar'
import { TableComponent } from '../components/TableComponent'
import { columnas } from '../data/columnsPedidos'
import { ModalVerPedidos } from '../views/ModalVerPedido'

export const Pedidos = () => {

    const api = "pedidos";

    const { getPedidos } = usePedidos();

    const { pedidos } = useSelector(state => state.producto);

    const { getProductos } = useServices();

    useEffect(() => {
        getPedidos()
        getProductos()
    }, [])
    

    return (
        <Grid
            component="main"
            alignItems="flex-start"
            sx={{ display: 'flex', padding: 4, minHeight: '100%', minwidth: '100%', backgroundColor: 'primary.main', borderRadius: 3 }}
            className='animate__animated animate__fadeIn animate__faster'>
            <ResponsiveDrawer />

            {Object.keys(pedidos).length === 0 ? <NothingSelectedView />
                : <TableComponent columnas={columnas} filas={pedidos} api={api}/>}

            <ModalVerPedidos/>

        </Grid>
    )
}