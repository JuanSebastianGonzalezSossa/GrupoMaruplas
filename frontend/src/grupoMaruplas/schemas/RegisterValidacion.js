import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

export const RegisterValidacions = yup.object().shape({

    name: yup.string().min(3).required("Requerido"),
    rol: yup.string().min(3).required("Requerido"),
    celular: yup.number().positive().min(10).integer().required("Requerido"),
    email: yup.string().email("Por favor ingresar correo valido").required("Requerido"),
    password: yup
        .string()
        .min(8)
        .matches(passwordRules, {message: "Minimo 8 caracteres, Maximo 15, Al menos una letra mayúscula, Al menos una letra minucula, Al menos un dígito, No espacios en blanco, Al menos 1 caracter especial."})
        .required()
});