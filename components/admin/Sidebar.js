import Logo from "../Logo";
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AddIcon from '@mui/icons-material/Add';
import BallotIcon from '@mui/icons-material/Ballot';
import styles from "../../styles/admin/Sidebar.module.css";
import CloseIcon from '@mui/icons-material/Close';


export default function Sidebar({open, setOpen}){
    return (
        <div className={open?styles.sidebar:styles.sidebar_closed}>
            <div onClick={setOpen} className={styles.close_icon}><CloseIcon /></div>
            <Logo />
            <Link href="/admin/dashboard">
                <a className={styles.side_link}>
                    <div><DashboardIcon /></div>
                    <p>Dashboard</p>
                </a>
            </Link>
            <Link href="/admin/products">
                <a className={styles.side_link}>
                    <div><BallotIcon /></div>
                    <p>Products</p>
                </a>
            </Link>
            <Link href="/admin/orders">
                <a className={styles.side_link}>
                    <div><ListAltIcon /></div>
                    <p>Orders</p>
                </a>
            </Link>
            <Link href="/admin/users">
                <a className={styles.side_link}>
                    <div><GroupIcon /></div>
                    <p>Users</p>
                </a>
            </Link>
            <Link href="/admin/reviews">
                <a className={styles.side_link}>
                    <div><RateReviewIcon /></div>
                    <p>Reviews</p>
                </a>
            </Link>
        </div>
    );
}