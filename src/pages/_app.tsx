import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import light from 'theme/light';
import createEmotionCache from '../utils/createEmotionCache';
import { PolkadotProvider } from 'contexts/Polkadot';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: any) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <PolkadotProvider>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={light}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </PolkadotProvider>
    );
};

export default MyApp;