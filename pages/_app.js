import '../styles/globals.css';
import {AlertProvider} from "../contexts/AlertContext";
import {UserProvider} from "../contexts/user/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AlertProvider>
  )
}

export default MyApp;
