import * as yup from "yup"


export const appointmentsOnDaySchema = yup.object({

    day: yup.string()
    .length(25, "O parâmetro 'day' deve ter 25 caracteres")
    .required("O parâmetro 'day' é obrigatório")
    .typeError("O parâmetro 'day' deve ser string")
})
