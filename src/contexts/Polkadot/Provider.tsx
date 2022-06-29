import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

export const PolkadotContext = createContext<any>(undefined)

export const PolkadotProvider = ({ children }) => {
    const [api, setAPI] = useState<any>();
    const wsProvider = new WsProvider('wss://rpc.fragnova.network');

    useEffect(() => {
        (async () => {
            if (api) return;
            const apiIns = await ApiPromise.create({ provider: wsProvider });
            await apiIns.isReady;
            setAPI(apiIns);
        })()
    }, []);

    if (!api) {
        return <>Loading...</>
    } else {
        return (
            <PolkadotContext.Provider value={{ api }}>
                {children}
            </PolkadotContext.Provider>
        )
    }
}
