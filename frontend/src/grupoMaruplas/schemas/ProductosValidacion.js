import * as yup from 'yup';

export const ProductosValidacion = yup.object().shape({

    nombre: yup.string().min(3).required("Requerido"),
    cantidad: yup.number().max(999, 'No puede tener mas de 999 articulos').positive().integer().required("Requerido"),
    precio: yup.number().positive().integer().required("Requerido"),
    descripcion: yup.string().min(5).required("Requerido"),
    referencia: yup.string().min(5).required("Requerido")
});