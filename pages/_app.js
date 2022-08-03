import '../styles/globals.css';
import {AlertProvider} from "../contexts/AlertContext";

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
    </AlertProvider>
  )
}

export default MyApp
