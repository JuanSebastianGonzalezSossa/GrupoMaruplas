import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { Cancel, Save } from '@mui/icons-material';
import { useUiStore } from '../../hooks/useUiStore';
import { useFormik } from 'formik'
import { useServices } from '../../hooks/UseServices';
import { ProductosValidacion } from '../schemas/ProductosValidacion';

Modal.setAppElement('#root');

export const ModalEditarProducto = () => {

    const { isSuccessOpen, CloseSuccess, isNow} = useUiStore();

    const { savingProductos } = useServices();

    const fileInputRef = useRef();

    const [file, setFile] = useState([]);

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;
        setFile(target.files);
        console.log(target.files)
    }
    
    const onSubmit = (values, actions) => {
        savingProductos(values, file)
        console.log(file)
        actions.resetForm();
        CloseSuccess();
    }

    const onCloseModal = () => {
        resetForm()
        CloseSuccess();
    }



    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, resetForm, setValues } = useFormik({
        initialValues: isNow,
        enableReinitialize: true,
        validationSchema: ProductosValidacion,
        onSubmit
    });

    return (
        <Modal
            isOpen={isSuccessOpen}
            onRequestClose={onCloseModal}
            className="modalEditarProductos"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Editar producto </Typography>
            <hr />
            <form onSubmit={handleSubmit} autoComplete='off' className='animate__animated animate__fadeIn animate__faster'>
                <Grid container direction='column' justifyContent='center'>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='nombre'
                                name='nombre'
                                label="Nombre *"
                                type="text"
                                placeholder='Nombre'
                                fullWidth
                                value={values.nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.nombre && touched.nombre ? true : false}
                                helperText={errors.nombre && touched.nombre ? errors.nombre : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='imagenURL'
                                nombre='imagenURL'
                                type="file"
                                fullWidth
                                ref={ fileInputRef }
                                onChange={onFileInputChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='cantidad'
                                name='cantidad'
                                label="Cantidad *"
                                type="number"
                                placeholder='Cantidad del producto'
                                fullWidth
                                value={values.cantidad}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.cantidad && touched.cantidad ? true : false}
                                helperText={errors.cantidad && touched.cantidad ? errors.cantidad : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='precio'
                                name='precio'
                                label="Precio *"
                                type="number"
                                placeholder='precio'
                                fullWidth
                                value={values.precio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.precio && touched.precio ? true : false}
                                helperText={errors.precio && touched.precio ? errors.precio : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='descripcion'
                                name='descripcion'
                                label="Descripcion *"
                                type="text"
                                placeholder='descripcion'
                                fullWidth
                                value={values.descripcion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.descripcion && touched.descripcion ? true : false}
                                helperText={errors.descripcion && touched.descripcion ? errors.descripcion : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='referencia'
                                name='referencia'
                                label="Referencia *"
                                type="text"
                                placeholder='referencia'
                                fullWidth
                                value={values.referencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.referencia && touched.referencia ? true : false}
                                helperText={errors.referencia && touched.referencia ? errors.referencia : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid container direction='row' justifyContent='center' >
                            <IconButton
                                size='large'
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'error.main',
                                    ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
                                    borderRadius: '15px',
                                    margin: '10px',
                                    fontSize: '18px',
                                }}
                                onClick={onCloseModal}
                            >
                                Cancelar &nbsp;
                                <Cancel />
                            </IconButton>
                            <IconButton
                                size='large'
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'primary.main',
                                    ':hover': { backgroundColor: 'primary.main', opacity: 0.8 },
                                    borderRadius: '15px',
                                    margin: '10px',
                                    fontSize: '18px'
                                }}
                                type="submit"
                            // disabled={Object.keys(errors).length !== 0 || !touched.nombre || !touched.rol || !touched.ciudad || !touched.email || !touched.password ? true : false}
                            >
                                Guardar &nbsp;
                                <Save />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Modal>
    )
}
