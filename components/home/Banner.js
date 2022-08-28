import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "../../styles/home/Banner.module.css";

const image1 = "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg";
const image2 = "https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg";
const image3 = "https://m.media-amazon.com/images/I/61CX1noQ8nL._SX3000_.jpg";
const all = [image1, image2, image3];

export default function Banner(){
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState(all);
    /*
    useEffect(() =>{
        console.log(index)
        if(index === 0){
            setIndex(prev =>prev + 1);
        }
        setImages(prev => ([...prev, all[index]]));
    }, [index]);*/

    function handleScrollLeft(){
        const slider = document.getElementById("slider");
        /*
        if(index <= 0){
            setImages(prev => {
                let firstImage = all[0];
                let newImages = all;
                //newImages.shift();
                newImages.push(firstImage);
                return newImages;
            })
            return setIndex(all.length - 1);
        }
        setIndex(prev => prev - 1);*/
        slider.scrollBy(-window.innerWidth,0);
        //setImages(prev => ([...prev, all[index]]));
    }

    function handleScrollRight(){
        /*
        console.log(index);
        const slider = document.getElementById("slider");
        if(index >= all.length){
            setImages(prev =>{
                let firstImage = all[0];
                let newImages = all;
                newImages.push(firstImage);
                console.log(newImages);
                return newImages;
            })
            return setIndex(0);
        }
        setIndex(prev => prev + 1);*/
        slider.scrollBy(window.innerWidth,0);
        
        //setImages(prev => ([...prev, all[index]]));
    }

    return (
        <div id="slider" className={styles.slider}>
            <div className={styles.move_left} onClick={handleScrollLeft}>
                <div className={styles.icon_left}></div>
            </div>
            <div className={styles.move_right} onClick={handleScrollRight}>
               <div className={styles.icon_right}></div>
            </div>
            {images?.map(image =>(
                <div key={image+Math.random().toString()} className={styles.slide}>
                    <Image src={image} layout='fill' priority />
                </div>
            ))}
        </div>
    )
}
