import * as yup from "yup"


export const loginSchema = yup.object({

    email: yup.string()
    .email("O campo 'email' deve ser um email válido")
    .min(3, "O campo 'email' deve ter no mínimo 3 caracteres")
    .max(64, "O campo 'email' deve ter no máximo 64 caracteres")
    .required("O campo 'email' é obrigatório")
    .typeError("O campo 'email' deve ser string"),
    password: yup.string()
    .min(6, "O campo 'password' deve ter no mínimo 6 caracteres")
    .max(64, "O campo 'password' deve ter no máximo 64 caracteres")
    .required("O campo 'password' é obrigatório")
    .typeError("O campo 'password' deve ser string")
})
