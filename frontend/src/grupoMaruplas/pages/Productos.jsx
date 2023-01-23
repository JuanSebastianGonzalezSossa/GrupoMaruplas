import { Button, Grid, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useEffect } from 'react'
import { ResponsiveDrawer } from '../components/sidebar'
import '../styles/StylesProductos.css'
import { useServices } from '../../hooks/UseServices';
import { useSelector } from 'react-redux';
import { useUiStore } from '../../hooks/useUiStore';
import { ProductosList } from '../components/ProductosList';
import { CheckingAuth } from '../../ui/components/CheckingAuth';
import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { ModalCrearProducto } from '../views';
import { ModalEditarProducto } from '../views/ModalEditarProducto';

export const Productos = () => {

    const [search, setSearch] = useState('');

    const { openDateModal } = useUiStore();

    const { getProductos } = useServices();

    const { productos } = useSelector(state => state.producto);
    // const { message, isSuccessOpen } = useSelector(state => state.ui);

    const filteredProducts = () => {

        if (search.length === 0)
            return productos
        //const productosfiltrados = productos;
        const productosfiltrados = productos.filter(prod => prod.nombre.includes(search) || prod.referencia.includes(search))
        return productosfiltrados
    }

    const onOpenModal = () => {
        openDateModal();
    }

    useEffect(() => {
        getProductos();
    }, [])

    const onSearchChange = ({ target }) => {
        setSearch(target.value);
    }



    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="row"
            alignItems="flex-start"
            justifyContent="space-evenly"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', marginTop: 5 }}
        >
            <ResponsiveDrawer />



            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                item
                xs={12}
                sx={{ height: '100%', width: '100%', backgroundColor: 'primary.main', marginRight: 0, marginLeft: 0, marginTop: 5 }}>
                <Typography variant='h4' color='primary.blanco' sx={{ marginInline: 8 }}> Productos </Typography>
                <form autoComplete='off'>
                    <TextField
                        id="outlined-start-adornment"
                        placeholder='Buscar'
                        value={search.toLowerCase()}
                        type="text"
                        sx={{ marginInline: 5, width: '260px', backgroundColor: 'primary.blanco', borderRadius: '10px', marginTop: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                            endAdornment: <InputAdornment position="end"><Button alt="Buscar"><Search /></Button></InputAdornment>
                        }}
                        onChange={onSearchChange}
                    />

                </form>
            </Grid>

            {Object.keys(productos).length === 0 ? <CheckingAuth />
                : <ProductosList Productos={filteredProducts()} />}

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

            <ModalCrearProducto />
            <ModalEditarProducto />

        </Grid>
    )
}