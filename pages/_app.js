import '../styles/globals.css'
import { AuthProvider } from '../src/contexts/AuthContext'
import { ToastContextProvider } from "../src/contexts/toastContext"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContextProvider>
        <Component {...pageProps} />
      </ToastContextProvider>
    </AuthProvider>
  )
}

export default MyApp
