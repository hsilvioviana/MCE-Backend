import { generateId } from "./idGenerator"


export const resetCode = () : string => {

    return generateId().substring(0, 8)
}
