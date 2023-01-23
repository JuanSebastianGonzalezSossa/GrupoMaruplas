import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { Cancel, Save } from '@mui/icons-material';
import { useUiStore } from '../../hooks/useUiStore';
import { useFormik } from 'formik'
import { RutaValidacion } from '../schemas';
import { useServices } from '../../hooks/UseServices';

Modal.setAppElement('#root');

export const ModalEditarRuta = () => {

    const { isSuccessOpen, CloseSuccess, isNow} = useUiStore();

    const { savingRutas } = useServices();

    const onSubmit = (values, actions) => {
        savingRutas(values)
        actions.resetForm();
        onCloseModal();
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, resetForm } = useFormik({
        initialValues: isNow,
       validationSchema: RutaValidacion,
       enableReinitialize: true,
       onSubmit

    });

    const onCloseModal = () => {
        resetForm()
        CloseSuccess();
    }


    return (
        <Modal
            isOpen={isSuccessOpen}
            onRequestClose={onCloseModal}
            className="modalruta"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Actualizar Ruta </Typography>
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
                                placeholder='Susana Restrepo'
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
                                id='ciudad'
                                nombre='ciudad'
                                label="Ciudad *"
                                type="text"
                                placeholder='Medellín'
                                fullWidth
                                value={values.ciudad}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.ciudad && touched.ciudad ? true : false}
                                helperText={errors.ciudad && touched.ciudad ? errors.ciudad : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='descripcion'
                                nombre='descripcion'
                                label="descripcion *"
                                type="text"
                                placeholder='Breve información de la empresa'
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
