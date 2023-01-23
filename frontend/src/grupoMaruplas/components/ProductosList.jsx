import { Delete, Edit } from '@mui/icons-material'
import { Button, Grid, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react'
import { useServices } from '../../hooks/UseServices';
import { onUpdateNow } from '../../store';
import Swal from 'sweetalert2';
import { useUiStore } from '../../hooks/useUiStore';
import { usePedidos } from '../../hooks/usePedidos';

export const ProductosList = ({ Productos }) => {

    const { DeletingProductos } = useServices();

    const { OpenSuccess, updateNow } = useUiStore();

    const { addToOrder } = usePedidos();

    const AbrirEditar = (actual) => {
        updateNow(actual)
        OpenSuccess()
    }

    const AbrirDelete = (actual) => {
        onUpdateNow(actual)
        Swal.fire({
            title: 'Estas seguro?',
            text: "Lo que vas a hacer no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                DeletingProductos(actual);
            }
        })
    }

    const AñadirPedido = (actual) => {
        //Añadir carrito
        updateNow(actual)
        addToOrder(actual)
    }


    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="flex-start"
            justifyContent="space-evenly">
            {Productos.map((prod, i) => (
                <Grid className="container page-wrapper" key={i} item xs={3} sx={{ backgroundColor: 'primary.main', marginRight: 0, marginLeft: 0 }}>
                    <Grid className="page-inner">
                        <Grid className="row">
                            <Grid className="el-wrapper">
                                <Grid className="box-up">
                                    <img className="img" src={prod.imagenURL} alt=""></img>
                                    <Grid className="img-info">
                                        <Grid className="info-inner">
                                            <span className="p-name">{prod.nombre}</span>
                                            <span className="p-cantidad">{prod.cantidad}</span>
                                        </Grid>
                                        <Grid className="a-size"><span className="size">{prod.descripcion}</span></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="box-down">
                                    <Grid className="h-bg">
                                        <Grid className="h-bg-inner"></Grid>
                                    </Grid>

                                    <Grid className="cart" >
                                        <span className="price">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COL' }).format(prod.precio)}</span>
                                        <span className="add-to-cart">
                                            <IconButton
                                                sx={{
                                                    right: '20%',
                                                    color: 'primary.main',
                                                    backgroundColor: 'white',
                                                    margin: '5px',
                                                    ':hover': { backgroundColor: 'fourth.main', opacity: 0.8 },
                                                }} onClick={() => AñadirPedido(prod)}
                                                disabled={prod.cantidad > 1 ? false : true}
                                                ><AddShoppingCartIcon sx={{ fontSize: 26 }}> </AddShoppingCartIcon> </IconButton>
                                            <IconButton sx={{
                                                left: '35%',
                                                color: 'secondary.main',
                                                backgroundColor: 'white',
                                                margin: '5px 20px 5px 5px',
                                                ':hover': { backgroundColor: 'fourth.main', opacity: 0.8 },
                                            }} onClick={() => AbrirEditar(prod)}><Edit sx={{ fontSize: 22 }}></Edit></IconButton>
                                            <IconButton sx={{
                                                left: '30%',
                                                color: 'error.main',
                                                backgroundColor: 'white',
                                                margin: '5px',
                                                ':hover': { backgroundColor: 'fourth.main', opacity: 0.8 },
                                            }} onClick={() => AbrirDelete(prod)}><Delete sx={{ fontSize: 22 }}></Delete></IconButton>
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ))
            }
        </Grid>
    )
}
