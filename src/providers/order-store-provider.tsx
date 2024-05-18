import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
    type OrderStore,
    createOrderStore,
    initOrderStore
} from "@/stores/order-store";

export const OrderStoreContext = createContext<StoreApi<OrderStore> | null>(
    null,
)

export interface CounterStoreProviderProps {
    children: ReactNode
}

export const OrderStoreProvider = ({children,}: CounterStoreProviderProps) => {
    const storeRef = useRef<StoreApi<OrderStore>>()
    if (!storeRef.current) {
        storeRef.current = createOrderStore(initOrderStore())
    }

    return (
        <OrderStoreContext.Provider value={storeRef.current}>
            {children}
        </OrderStoreContext.Provider>
    )
}

export const useOrderStore = <T,>(
    selector: (store: OrderStore) => T,
): T => {
    const counterStoreContext = useContext(OrderStoreContext)

    if (!counterStoreContext) {
        throw new Error(`useOrderStore must be use within OrderStoreProvider`)
    }

    return useStore(counterStoreContext, selector)
}