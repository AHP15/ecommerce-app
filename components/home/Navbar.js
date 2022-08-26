import styles from "../../styles/home/Navbar.module.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/router';
import { useUser } from "../../contexts/user/UserContext";
import { useBasket } from "../../contexts/basket/BasketContext";
import Link from "next/link";

export default function Navbar({open, setOpenlinks}) {
    const router = useRouter();
    const {user} = useUser();
    const {basket} = useBasket();

   return (
    <div className={open?styles.navbar:styles.navbar_close}>
        <Link href={user.isLoggedIn?"/":"/login"}>
            <a
              onMouseMove={() =>setOpenlinks(true)}
              onTouchMove={() =>setOpenlinks(true)}
              onMouseOut={() =>setOpenlinks(false)}
            >
              <h5>Hello {user.info?.name || "Guest"}</h5>
              {!user.isLoggedIn && <h4>Sign In</h4>}
            </a>
        </Link>

        <Link href="/orders">
            <a>
              <h5>Returns</h5>
              <h4>& Orders</h4>
            </a>
        </Link>

        <Link href="/basket">
            <a>
            <h5><AddShoppingCartIcon /></h5>
            <h4>{basket.length}</h4>
            </a>
        </Link>
    </div>
   )
}
