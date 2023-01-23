import { Grid, IconButton, Typography } from "@mui/material"
import '../styles/AsesoresGrid.css'
import { Delete, Edit } from "@mui/icons-material";
import { useUiStore } from "../../hooks/useUiStore";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";


export const AsesorGrid = ({ data }) => {

    const { OpenSuccess, updateNow } = useUiStore();

    const { startDeletingAsesor } = useAuthStore();

    const AbrirEditar = (actual) => {
        updateNow(actual)
        OpenSuccess()
    }

    const AbrirDelete = (actual) => {
        updateNow(actual)
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
                startDeletingAsesor(actual, "auth");
            }
        })
    }


    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="flex-start"
            justifyContent="space-evenly"
            sx={{ marginTop: 4 }}
        >

            {data.map((User, i) => (
                <Grid
                    item
                    className="container"
                    alignItems="center"
                    justifyContent="space-evenly"
                    key={i}
                    xs={9}
                    sm={5}
                    md={5}
                    lg={3}
                    sx={{ display: 'flex', flexDirection: 'column', height: '20%', width: '100%', margin: 2, padding: 2, backgroundColor: 'white', borderRadius: 4, color: 'black' }}
                >
                    <IconButton sx={{
                        left: '45%',
                        color: 'secondary.main',
                        backgroundColor: 'white',
                        ':hover': { backgroundColor: 'fourth.main', opacity: 0.8 },
                    }} onClick={() => AbrirEditar(User)}><Edit sx={{ fontSize: 22 }}></Edit></IconButton>
                    <IconButton sx={{
                        left: '45%',
                        color: 'error.main',
                        backgroundColor: 'white',
                        ':hover': { backgroundColor: 'fourth.main', opacity: 0.8 },
                    }} onClick={() => AbrirDelete(User)}><Delete></Delete></IconButton>
                    <Typography variant='h7' sx={{ marginTop: '-70px', padding: '3px' }}> {User.name} </Typography>
                    <Typography variant='h7' sx={{ padding: '3px' }}> {User.rol}</Typography>
                    <Typography variant='h7' sx={{ padding: '3px' }}> {User.celular}</Typography>
                    <Typography variant='h7' sx={{ padding: '3px' }}> {User.email}</Typography>
                </Grid>
            ))}
        </Grid>
    )
}


