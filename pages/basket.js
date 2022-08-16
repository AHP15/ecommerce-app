import Head from "next/head";
import Header from "../components/home/Header";
import styles from "../styles/basket/Basket.module.css";
import {useBasket} from "../contexts/basket/BasketContext";
import BasketItem from "../components/basket/BasketItem";

export default function Basket(){
    const {basket} = useBasket();
    return (
        <>
          <Head>
            <title>amazon | basket</title>
          </Head>
          <Header />
          <main className="home" >
            <div className={styles.basket}>
              <div className={styles.basket_items}>
                <h1>{basket?.length > 0?"Shopping Cart" : "Your Amazon Cart is empty."}</h1>
                {basket.map(item => (
                  <BasketItem key={item._id} item={item} />
                ))}
              </div>
              <div className={styles.basket_subtotal}></div>
            </div>
          </main>
        </>
    );
}