import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { useUiStore } from '../../hooks/useUiStore';
import { useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { usePedidos } from '../../hooks/usePedidos';


Modal.setAppElement('#root');

export const ModalPedidos = () => {

    var Total = 0;

    const { isPedidoOpen, closePedidoModal, openRutaModal, saveTotal } = useUiStore();

    const { RemoveOneFromOrder, addToOrder, clearOrder } = usePedidos();

    const { pedidos } = useSelector(state => state.pedido);

    const onCloseModal = () => {
        closePedidoModal();
    }

    const removeFromOrder = (order) => {
        RemoveOneFromOrder(order);
    }

    const addToPedido = (order) => {
        addToOrder(order);
    }

    const valorTotal = (order) => {
        Total = Total + (order.cantidad * order.precio)
    }

    return (
        <Modal
            isOpen={isPedidoOpen}
            onRequestClose={onCloseModal}
            className="modalPedido"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Pedido </Typography>
            <hr />

            {pedidos.map((ped, i) => (
                <Grid container key={i} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }} >
                    <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center' }}>
                        <IconButton onClick={() => removeFromOrder(ped)} sx={{
                            color: 'error.main',
                            backgroundColor: 'white',
                            ':hover': { backgroundColor: 'white', opacity: 0.5 }
                        }}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Typography variant='h7' key={i} sx={{ padding: '3px', fontSize: '20px' }}> {ped.nombre} ({ped.cantidad})</Typography>
                        <IconButton onClick={() => addToPedido(ped)} sx={{
                            color: 'error.success',
                            backgroundColor: 'white',
                            ':hover': { backgroundColor: 'white', opacity: 0.5 }
                        }}>
                            {valorTotal(ped)}
                            <AddCircleOutlineIcon />
                        </IconButton >
                    </Grid>
                </Grid>

            ))}
            {saveTotal(Total)}
            <hr />
            <Typography variant='h7' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '10px', fontStyle: 'italic', fontWeight: 'bold' }}>Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COL' }).format(Total)}</Typography>

            <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: '10px' }}  >
                <Button onClick={() => clearOrder()} sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.5 }
                }}>Limpiar <DeleteOutlineIcon /></Button>
                <Button onClick={() => openRutaModal()} sx={{
                    color: 'white',
                    backgroundColor: 'secondary.main',
                    ':hover': { backgroundColor: 'secondary.main', opacity: 0.5 }
                }}>Siguiente</Button>
            </Grid>
            
        </Modal>

    )
        
}
