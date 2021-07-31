import * as yup from "yup"


export const appointmentsDisponibilitySchema = yup.object({

    providerId: yup.string()
    .min(3, "O campo 'providerId' deve ter no mínimo 3 caracteres")
    .max(64, "O campo 'providerId' deve ter no máximo 64 caracteres")
    .required("O campo 'providerId' é obrigatório")
    .typeError("O campo 'providerId' deve ser string"),
    day: yup.string()
    .length(25, "O campo 'day' deve ter 25 caracteres")
    .required("O campo 'day' é obrigatório")
    .typeError("O campo 'day' deve ser string")
})
