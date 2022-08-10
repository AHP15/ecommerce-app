import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Rating } from '@mui/material';
import styles from "../../styles/product/ProductCard.module.css";

const ProductCard = React.memo(({product}) =>{
    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Link href={`/products/${product._id}`}>
          <a className={styles.productCard}>
              <Image 
               src={product.images[0]?.url} 
               alt={product.name}
               width="250px"
               height="200px"
               layout="responsive"
               objectFit="contain"
              />
            <p>{product.name?.slice(0,50)+"..."}</p>
            <div>
               <Rating {...options} />{" "}
               <span className="productCardSpan">
                 {" "}
                 ({product.numOfReviews} Reviews)
               </span>
            </div>
            <span>{`$${product.price}`}</span>
          </a>
        </Link>
    );
}, equalByValue);

function equalByValue(prevProps, nextProps){
  Object.keys(nextProps).forEach(key =>{
    if(nextProps[key] !== prevProps[key]){
      console.log("ok")
      return false;
    }
  });
  return true;
}

export default ProductCard;