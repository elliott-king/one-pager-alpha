import { AppProps } from 'next/app';
import { ThemeProvider } from '@chakra-ui/core';

import { Provider } from 'react-redux';
import { useStore } from '../store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/global.scss';
import "mapbox-gl/dist/mapbox-gl.css";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <Provider store={store} >
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
