import styles from "../../styles/home/Navbar.module.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react";

export default function Navbar({open}) {

   return (
    <div className={open?styles.navbar:styles.navbar_close}>
        <div>
            <h5>Hello Guest</h5>
            <h4>Sign In</h4>
        </div>

        <div>
            <h5>Returns</h5>
            <h4>& Orders</h4>
        </div>

        <div>
            <h5><AddShoppingCartIcon /></h5>
            <h4>0</h4>
        </div>
    </div>
   )
}
