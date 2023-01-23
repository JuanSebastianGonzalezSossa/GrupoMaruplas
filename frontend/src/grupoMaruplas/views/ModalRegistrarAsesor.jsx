import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Modal from 'react-modal';
import '../styles/stylesModal.css'
import { Cancel, Save } from '@mui/icons-material';
import { useUiStore } from '../../hooks/useUiStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useFormik } from 'formik'
import { RegisterValidacions } from '../schemas/RegisterValidacion';

Modal.setAppElement('#root');

export const ModalRegistrarAsesor = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { startRegister } = useAuthStore();

    const onSubmit = (values, actions) => {
        startRegister(values)
        actions.resetForm();
        closeDateModal();
    }



    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, resetForm } = useFormik({
        initialValues: {
            name: '',
            rol: '',
            celular: '',
            email: '',
            password: ''
        },
        validationSchema: RegisterValidacions,
        onSubmit

    });

    const onCloseModal = () => {
        resetForm()
        closeDateModal();
    }


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <Typography variant='h5' noWrap component='div' textAlign="center" fontSize='28px' fontWeight='bold' > Registrar Asesor </Typography>
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
                        <Grid style={{ width: '98%', padding: '5px' }}>
                            <FormControl required sx={{ m: 1, minWidth: '100%' }}>
                                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                <Select
                                    sx={{ minWidth: '90%'}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='rol'
                                    value={values.rol}
                                    label="Rol *"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.rol && touched.rol ? true : false}
                                    helperText={errors.rol && touched.rol ? errors.rol : ""}
                                >
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                    <MenuItem value="Asesor">Asesor</MenuItem>
                                </Select>
                            </FormControl>
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
                        <Grid style={{ width: '100%', padding: '5px' }}>
                            <TextField
                                id='password'
                                name='password'
                                label="Password *"
                                type="password"
                                fullWidth
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password && touched.password ? true : false}
                                helperText={errors.password && touched.password ? errors.password : ""}
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
                                    fontSize: '18px',
                                    ':disabled': {}
                                }}
                                type="submit"
                                disabled={Object.keys(errors).length !== 0 || !touched.name || !touched.rol || !touched.celular || !touched.email || !touched.password ? true : false}
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
