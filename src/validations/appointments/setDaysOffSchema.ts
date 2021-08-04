import * as yup from "yup"


export const setDaysOffSchema = yup.object({

    firstDayOff: yup.string()
    .length(25, "O campo 'firstDayOff' deve ter 25 caracteres")
    .required("O campo 'firstDayOff' é obrigatório")
    .typeError("O campo 'firstDayOff' deve ser string"),
    lastDayOff: yup.string()
    .length(25, "O campo 'lastDayOff' deve ter 25 caracteres")
    .required("O campo 'lastDayOff' é obrigatório")
    .typeError("O campo 'lastDayOff' deve ser string")
})
