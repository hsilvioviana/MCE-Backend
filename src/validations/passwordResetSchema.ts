import * as yup from "yup"


export const passwordResetSchema = yup.object({

    email: yup.string()
    .email("O campo 'email' deve ser um email válido")
    .min(3, "O campo 'email' deve ter no mínimo 3 caracteres")
    .max(64, "O campo 'email' deve ter no máximo 64 caracteres")
    .required("O campo 'email' é obrigatório")
    .typeError("O campo 'email' deve ser string"),
    code: yup.string()
    .length(8, "O campo 'code' deve ter 8 caracteres")
    .required("O campo 'code' é obrigatório")
    .typeError("O campo 'code' deve ser string"),
    newPassword: yup.string()
    .min(6, "O campo 'newPassword' deve ter no mínimo 6 caracteres")
    .max(64, "O campo 'newPassword' deve ter no máximo 64 caracteres")
    .required("O campo 'newPassword' é obrigatório")
    .typeError("O campo 'newPassword' deve ser string")
})
