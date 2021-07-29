import * as yup from "yup"


export const profileEditSchema = yup.object({

    nickname: yup.string()
    .min(3, "O campo 'nickname' deve ter no mínimo 3 caracteres")
    .max(64, "O campo 'nickname' deve ter no máximo 64 caracteres")
    .required("O campo 'nickname' é obrigatório")
    .typeError("O campo 'nickname' deve ser string"),
    email: yup.string()
    .email("O campo 'email' deve ser um email válido")
    .min(3, "O campo 'email' deve ter no mínimo 3 caracteres")
    .max(64, "O campo 'email' deve ter no máximo 64 caracteres")
    .required("O campo 'email' é obrigatório")
    .typeError("O campo 'email' deve ser string"),
    phone: yup.string()
    .min(8, "O campo 'phone' deve ter no mínimo 8 caracteres")
    .max(16, "O campo 'phone' deve ter no máximo 16 caracteres")
    .required("O campo 'phone' é obrigatório")
    .typeError("O campo 'phone' deve ser string"),
    password: yup.string()
    .min(6, "O campo 'password' deve ter no mínimo 6 caracteres")
    .max(64, "O campo 'password' deve ter no máximo 64 caracteres")
    .typeError("O campo 'password' deve ser string"),
    newPassword: yup.string()
    .min(6, "O campo 'newPassword' deve ter no mínimo 6 caracteres")
    .max(64, "O campo 'newPassword' deve ter no máximo 64 caracteres")
    .typeError("O campo 'newPassword' deve ser string")
})
