import { atom } from "recoil";

const textState = atom({
    key:'textState',
    default: '',
})

export { textState }