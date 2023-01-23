import * as yup from 'yup';

export const RutaValidacion = yup.object().shape({

    nombre: yup.string().min(3).required("Requerido"),
    ciudad: yup.string().min(3).required("Requerido"),
    descripcion: yup.string().min(5).required("Requerido")
});