import React from "react";
import {equalByValue} from "../../utils/compareProps";
import styles from "../../styles/basket/BasketItem.module.css";
import Image from "next/image";
import { useBasket } from "../../contexts/basket/BasketContext";

export default React.memo(({item}) =>{

    const {changeQuantity, removeItem} = useBasket();

    return (
        <div>
            <div className={styles.item_container}>
              <div className={styles.item_image}>
                <Image 
                   src={item.images[0].url} 
                   alt={item.name} 
                   layout="fill"
                   objectFit="contain"
                />
              </div>
              <div className={styles.item_info}>
                <h4>{item.name}</h4>
                <h4>{
              Number(item.stock) > 0
                ? <span style={{ color: 'green' }}>InStock</span>
                : <span style={{ color: 'red' }}>OutOfStock</span>
               }</h4>

               <div className={styles.item_actions}> 
                 <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={e => changeQuantity(e.target.value, item._id)} 
                />
                <p onClick={() =>removeItem(item._id)}>delete</p>
               </div>
              </div>
              <h2 className={styles.item_price}>${item.price}</h2>
            </div>
            <h4
              className={styles.item_subtotal}
            >
                item.Subtotal ({item.quantity} items)${item.quantity * item.price}
            </h4>
        </div>
    );
}, equalByValue);
