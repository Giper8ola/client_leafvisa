import {createStore} from "zustand";
import {ApplicantDetail} from "@/utils/types/types";
import {toNormalData} from "@/utils/lib/toNormalData";


export type OrderState = {
    details: ApplicantDetail[],
    dates: string[],
    foundUs: string,
    password: string,

}

export type OrderActions = {
    pushApplicant: (arg: ApplicantDetail, cur: number) => void
    updatePickedData: (arg: string[]) => void
    updateFoundUs: (arg: string) => void,
    setPassword: (arg: string) => void
}

export type OrderStore = OrderState & OrderActions

export const initOrderStore = (): OrderState => {
    return {
        details: [],
        dates: [],
        foundUs: '',
        password: ''
    }
}

export const defaultInitState: OrderState = {
    details: [],
    dates: [],
    foundUs: '',
    password: ''
}

export const createOrderStore = (
    initState: OrderState = defaultInitState,
) => {
    return createStore<OrderStore>()((set) => ({
        ...initState,
        pushApplicant: (detail: ApplicantDetail, cur :number) => set((state) => ({
            details: Object.values({...state.details, [cur]: toNormalData(detail)})
        })),
        updatePickedData: (dates: string[]) => set((state) => ({ dates: [...dates] })),
        updateFoundUs: (fu: string) => set((state) => ({ foundUs: fu })),
        setPassword: (pass: string) => set((state) => ({password: pass}))
    }))
}