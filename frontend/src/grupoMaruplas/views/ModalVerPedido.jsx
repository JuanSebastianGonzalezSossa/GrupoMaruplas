import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { useUiStore } from '../../hooks/useUiStore';
import { useSelector } from 'react-redux';



Modal.setAppElement('#root');

export const ModalVerPedidos = () => {

    const { isSuccessOpen, CloseSuccess } = useUiStore();

    const { isNow } = useSelector(state => state.ui);

    const TraerProductos = () => {
        if (Object.keys(isNow).length != 0) {
            const { Productos, Cliente, Ruta, precioTotal } = isNow;
            return (
                <Grid container sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='20px' > Cliente: {Cliente} </Typography>
                    <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='20px' > Ruta: {Ruta} </Typography>
                    <hr/>
                    <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='22px' fontWeight='bold'> Productos </Typography>
                   {console.log(Productos)}
                    {Productos ? Productos.map((prod, i) => (<Typography  key={i} variant='h5' noWrap component='div' textAlign="center" fontSize='20px' > {prod.nombre} (x{prod.cantidad}) </Typography>)): null} 
                    <hr />
                    <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='18px' fontWeight='bold'> {precioTotal} </Typography>
                </Grid>
            )
        }
    }



    const onCloseModal = () => {
        CloseSuccess();
    }

    return (
        <Modal
            isOpen={isSuccessOpen}
            onRequestClose={onCloseModal}
            className="modalPedido"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Pedido </Typography>
            <hr />

            {TraerProductos()}
        </Modal>

    )

}
