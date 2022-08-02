import Image from "next/image";
import styles from "../../styles/home/Header.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "./Navbar";
import {useState} from "react";

export default function Header(){
    const [open, setOpen] = useState(false);
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                   src='https://links.papareact.com/f90'
                   alt="amazon logo"
                   width={70}
                   height={50}
                   className={styles.logo_img}
                />
            </div>

            <form>
                <input type="text"/>
                <button type="submit">
                    <SearchIcon />
                </button>
            </form>

            <div 
               onClick={() =>setOpen(open => !open)} 
               className={open?styles.close:styles.humberger}
            >
                <div className={open? styles.close_bar:styles.bar}></div>
            </div>

            <div>
                <Navbar open={open} />
            </div>
        </header>
    );
}