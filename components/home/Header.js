import Image from "next/image";
import styles from "../../styles/home/Header.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "./Navbar";
import {useState} from "react";
import {useUser} from "../../contexts/user/UserContext";
import Link from "next/link";

export default function Header(){

    const [open, setOpen] = useState(false);
    const [openlinks, setOpenlinks] = useState(false);
    const {user, logout} = useUser();


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                  <a>
                   <Image
                    src='https://links.papareact.com/f90'
                    alt="amazon logo"
                    layout="fill"
                    className={styles.logo_img}
                   />
                  </a>
                </Link>
            </div>

            <form>
                <input type="text"/>
                <button type="submit">
                    <SearchIcon />
                </button>
            </form>

            <div 
               onClick={() =>{
                setOpen(open => !open)
                setOpenlinks(false);
               }} 
               className={open?styles.close:styles.humberger}
            >
                <div className={open? styles.close_bar:styles.bar}></div>
            </div>
            <Navbar open={open} setOpenlinks={setOpenlinks} />

            {user.isLoggedIn && <div 
              className={openlinks?styles.user_links_open:styles.user_links}
              onMouseMove={() =>setOpenlinks(true)}
              onTouchMove={() =>setOpenlinks(true)}
              onMouseOut={() =>setOpenlinks(false)}
            >
             {  user.info?.role === "admin" && 
              <Link href="/admin/dashboard"><a className={styles.link}>Dashboard</a></Link>
             }
             <Link href="/profile"><a className={styles.link}>Profile</a></Link>
               <p onClick={logout} className={styles.link}>Logout</p>
            </div>
            }
        </header>
    );
}