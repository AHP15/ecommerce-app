import Image from "next/image";
import styles from "../../styles/home/Header.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "./Navbar";

export default function Header(){
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

            <div>
                <Navbar />
            </div>
        </header>
    );
}