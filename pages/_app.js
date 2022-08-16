import '../styles/globals.css';
import {AlertProvider} from "../contexts/AlertContext";
import {UserProvider} from "../contexts/user/UserContext";
import {BasketProvider} from "../contexts/basket/BasketContext";

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <UserProvider>
        <BasketProvider>
          <Component {...pageProps} />
        </BasketProvider>
      </UserProvider>
    </AlertProvider>
  )
}

export default MyApp;
