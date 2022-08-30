import { Avatar, Rating } from "@mui/material";
import styles from "../../styles/product/Review.module.css";

// I can add React.memo
export default function Review({review}){

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className={styles.review}>
            <div className={styles.review_user}>
                <Avatar />
                <h3>{review.name}</h3>
            </div>
            <div className={styles.review_info}>
              <Rating {...options} />
              <p>{review.comment}</p>
            </div>
        </div>
    );
}