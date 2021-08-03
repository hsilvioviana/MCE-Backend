import * as yup from "yup"


export const changeScheduleSchema = yup.object({

    sunday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'sunday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'sunday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'sunday' é obrigatório")
    .typeError("O parâmetro 'sunday' deve ser array de números"),
    monday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'monday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'monday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'monday' é obrigatório")
    .typeError("O parâmetro 'monday' deve ser array de números"),    
    tuesday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'tuesday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'tuesday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'tuesday' é obrigatório")
    .typeError("O parâmetro 'tuesday' deve ser array de números"),    
    wednesday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'wednesday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'wednesday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'wednesday' é obrigatório")
    .typeError("O parâmetro 'wednesday' deve ser array de números"),    
    thursday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'thursday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'thursday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'thursday' é obrigatório")
    .typeError("O parâmetro 'thursday' deve ser array de números"),    
    friday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'friday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'friday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'friday' é obrigatório")
    .typeError("O parâmetro 'friday' deve ser array de números"),    
    saturday: yup.array()
    .of(yup.number()
    .min(0, "Nenhum número do array de 'saturday' pode ser menor que 0")
    .max(23, "Nenhum número do array de 'saturday' pode ser maior que 23")
    .integer())
    .required("O parâmetro 'saturday' é obrigatório")
    .typeError("O parâmetro 'saturday' deve ser array de números")
})
