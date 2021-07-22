import TagManager from 'react-gtm-module';
import { useEffect } from 'react';
import { AuthProvider } from '../src/contexts/AuthContext'
import { ToastContextProvider } from "../src/contexts/toastContext"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-C912LDSL0F' });
  }, []);

  return (
    <AuthProvider>
      <ToastContextProvider>
        <Component {...pageProps} />
      </ToastContextProvider>
    </AuthProvider>
  )
}

export default MyApp
