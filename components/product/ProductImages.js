import React, { useState } from "react";
import {equalByValue} from "../../utils/compareProps";
import styles from "../../styles/product/ProductImages.module.css";
import Image from "next/image";

function ImageSlide({public_id, name, url, selectedimage, setSelectedimage}){
    return (
        <div
            onClick={() =>setSelectedimage({public_id,url})}
            className={
                selectedimage == public_id ? styles.small_selected : ""
            }
        >
            <Image src={url} alt={name} layout="fill" objectFit="contain" />
        </div>
    );
}

const Component = React.memo(({images, name}) =>{
    const [selectedimage, setSelectedimage] = useState(() =>images[0]);

    return (
        <div className={styles.images}>
            <div className={styles.all}>
                {images.map(image => (
                    <ImageSlide
                       key={image.public_id}
                       url={image.url} 
                       name={name} 
                       public_id={image.public_id}
                       selectedimage={selectedimage.public_id}
                       setSelectedimage={(img) =>setSelectedimage(img)}
                    />
                ))}
            </div>
            <div className={styles.selected}>
                <Image src={selectedimage.url} alt={name} layout="fill" objectFit="contain" />
            </div>
        </div>
    );
}, equalByValue);

export default function ProductImages({images, name}){
    return <Component images={images} name={name}/>
}
