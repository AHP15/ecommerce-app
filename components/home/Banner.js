import { useState } from 'react';
import Image from "next/image";
import styles from "../../styles/home/Banner.module.css";

const image1 = "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg";
const image2 = "https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg";
const image3 = "https://m.media-amazon.com/images/I/61CX1noQ8nL._SX3000_.jpg";


export default function Banner(){

    const [images, setImages] = useState([image1, image2, image3].concat(image1));

    return (
        <div className={styles.slider}>
            <div className={styles.move_left}>
                <div className={styles.icon_left}></div>
            </div>
            <div className={styles.move_right}>
               <div className={styles.icon_right}></div>
            </div>
            {images?.map(image =>(
                <div key={image} className={styles.slide}>
                    <Image src={image} layout='fill' />
                </div>
            ))}
        </div>
    )
}
