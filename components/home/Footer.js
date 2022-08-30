import styles from "../../styles/home/Footer.module.css";

export default function Footer() {

    function handleBack(){
        window.scrollTo({
            left: 0,
            top:0,
            behavior: "smooth"
           });
    }

    return (
        <footer className={styles.footer}>
            <div onClick={handleBack} className={styles.back}>Back to Top</div>
            <div className={styles.links}>
                <ul>
                    <h3>Get to Know Us</h3>
                    <li>creers</li>
                    <li>Blog</li>
                    <li>About Amazon</li>
                    <li>Investor Relations</li>
                    <li>Amazon Devices</li>
                    <li>Amazon Tours</li>
                </ul>

                <ul>
                    <h3>Make Money with Us</h3>
                    <li>Sell products on Amazon</li>
                    <li>Sell on Amazon Business</li>
                    <li>Sell apps on Amazon</li>
                    <li>Become an Affiliate</li>
                    <li>Advertise Your Products</li>
                    <li>Self-Publish with Us</li>
                    <li>Host an Amazon Hub</li>
                    <li>See More Make Money with Us</li>
                </ul>

                <ul>
                    <h3>Amazon Payment Products</h3>
                    <li>Amazon Business Card</li>
                    <li>Shop with Points</li>
                    <li>Reload Your Balance</li>
                    <li>Amazon Currency Converter</li>
                </ul>

                <ul>
                   <h3>Let Us Help You</h3>
                   <li>Amazon and COVID-19</li>
                   <li>Your Account</li>
                   <li>Your Orders</li>
                   <li>Shipping Rates & Policies</li>
                   <li>Returns & Replacements</li>
                   <li>Manage Your Content and Devices</li>
                   <li>Amazon Assistant</li>
                   <li>Help</li>
                </ul>
            </div>
        </footer>
    )
}