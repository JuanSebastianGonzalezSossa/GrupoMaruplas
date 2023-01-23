import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { Cancel, Save } from '@mui/icons-material';
import { useUiStore } from '../../hooks/useUiStore';
import { useFormik } from 'formik'
import { ClienteValidacions } from '../schemas';
import { useServices } from '../../hooks/UseServices';

Modal.setAppElement('#root');

export const ModalEditarCliente = () => {

    const { isSuccessOpen, CloseSuccess, isNow} = useUiStore();

    const { savingClientes } = useServices();

    const onSubmit = (values, actions) => {
        savingClientes(values)
        actions.resetForm();
        onCloseModal();
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, resetForm } = useFormik({
        initialValues: isNow,
       validationSchema: ClienteValidacions,
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
            className="modalCliente"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Clientes Ruta </Typography>
            <hr />
            <form onSubmit={handleSubmit} autoComplete='off' className='animate__animated animate__fadeIn animate__faster'>
                <Grid container direction='column' justifyContent='center'>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                        <TextField
                                id='nombres'
                                name='nombres'
                                label="Nombres *"
                                type="text"
                                placeholder='Susana Restrepo'
                                fullWidth
                                value={values.nombres}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.nombres && touched.nombres ? true : false}
                                helperText={errors.nombres && touched.nombres ? errors.nombres : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                        <TextField
                                id='apellidos'
                                nombre='apellidos'
                                label="Apellidos *"
                                type="text"
                                placeholder='Medellín'
                                fullWidth
                                value={values.apellidos}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.apellidos && touched.apellidos ? true : false}
                                helperText={errors.apellidos && touched.apellidos ? errors.apellidos : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid >
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='empresa'
                                nombre='empresa'
                                label="Empresa *"
                                type="text"
                                placeholder='Medellín'
                                fullWidth
                                value={values.empresa}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.empresa && touched.empresa ? true : false}
                                helperText={errors.empresa && touched.empresa ? errors.empresa : ""}
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
                                id='correo'
                                name='correo'
                                label="Correo *"
                                type="text"
                                placeholder='Correo@GrupoMaruplas.com'
                                fullWidth
                                value={values.correo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.correo && touched.correo ? true : false}
                                helperText={errors.correo && touched.correo ? errors.correo : ""}
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
