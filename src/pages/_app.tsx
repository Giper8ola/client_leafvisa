import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {PrimeReactProvider} from "primereact/api"
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';
import {OrderStoreProvider} from "@/providers/order-store-provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <OrderStoreProvider>
            <PrimeReactProvider>
                <Component {...pageProps} />
            </PrimeReactProvider>
        </OrderStoreProvider>
    );
}
