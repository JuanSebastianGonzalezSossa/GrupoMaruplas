import * as yup from 'yup';

export const ClienteValidacions = yup.object().shape({

    nombres: yup.string().min(3).required("Requerido"),
    apellidos: yup.string().min(3).required("Requerido"),
    empresa: yup.string().min(3).required("Requerido"),
    celular: yup.number().positive().min(10).integer().required("Requerido"),
    correo: yup.string().email("Por favor ingresar correo valido").required("Requerido"),
});