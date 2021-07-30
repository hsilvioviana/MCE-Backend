import * as yup from "yup"


export const makeAppointmentSchema = yup.object({

    providerId: yup.string()
    .min(3, "O campo 'providerId' deve ter no mínimo 3 caracteres")
    .max(64, "O campo 'providerId' deve ter no máximo 64 caracteres")
    .required("O campo 'providerId' é obrigatório")
    .typeError("O campo 'providerId' deve ser string"),
    date: yup.string()
    .length(25, "O campo 'date' deve ter 25 caracteres")
    .required("O campo 'date' é obrigatório")
    .typeError("O campo 'date' deve ser string")
})
