import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { Cancel, Save } from '@mui/icons-material';
import { useUiStore } from '../../hooks/useUiStore';
import { useFormik } from 'formik'
import { ClienteValidacions } from '../schemas';
import { useServices } from '../../hooks/UseServices';
import { useAuthStore } from '../../hooks/useAuthStore';

Modal.setAppElement('#root');

export const ModalEditarAsesor = () => {

    const { isSuccessOpen, CloseSuccess, isNow} = useUiStore();

    const { savingUsuarios } = useAuthStore();

    const onSubmit = (values, actions) => {
        savingUsuarios(values)
        actions.resetForm();
        onCloseModal();
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, resetForm } = useFormik({
        initialValues: isNow,
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
            className="modalEditarAsesor"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Editar Asesor </Typography>
            <hr />
            <form onSubmit={handleSubmit} autoComplete='off' className='animate__animated animate__fadeIn animate__faster'>
                <Grid container direction='column' justifyContent='center'>
                <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='name'
                                name='name'
                                label="Nombre *"
                                type="text"
                                placeholder='Susana Restrepo'
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name && touched.name ? true : false}
                                helperText={errors.name && touched.name ? errors.name : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='celular'
                                name='celular'
                                label="Celular *"
                                type="number"
                                placeholder='3001234567'
                                fullWidth
                                value={values.celular}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.celular && touched.celular ? true : false}
                                helperText={errors.celular && touched.celular ? errors.celular : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='email'
                                name='email'
                                label="Email *"
                                type="text"
                                placeholder='Correo@GrupoMaruplas.com'
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email && touched.email ? true : false}
                                helperText={errors.email && touched.email ? errors.email : ""}
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
