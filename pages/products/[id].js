import connectDB from "../../db/connection";
import {ObjectId} from "mongodb";
import Head from "next/head";
import Header from "../../components/home/Header";
import styles from "../../styles/product/Product.module.css";
import ProductImages from "../../components/product/ProductImages";
import { Rating } from '@mui/material';
import { useState } from "react";
import { useBasket } from "../../contexts/basket/BasketContext";
import { useUser } from "../../contexts/user/UserContext";
import { useAlert } from "../../contexts/AlertContext";
import Alert from "../../components/Alert";
import axios from "axios";
import Review from "../../components/product/Review";

export async function getStaticPaths() {
    let paths = [];
    try {
        const DB = await connectDB();
        const Product = DB.collection("products");

        const products = await Product.find({}).toArray();
        paths = products.map(product => ({ params : {id : String(product._id)}}));
        console.log(paths);
    }catch(err) {
        console.log(err.message);
    }

    return {
      paths: paths,
      fallback: 'blocking',
    }
  }
  
export async function getStaticProps(context) {
    let product = {};
    try{
        const DB = await connectDB();
        const Product = DB.collection("products");
        product = await Product.findOne({_id:ObjectId(context.params.id)})
    }catch(err) {
        console.log(err.message)
    }

    return {
      props: { 
        product:{
            ...product,
            _id:String(product._id)
        }
      },
      revalidate: 10,
    }
}

export default function Product({product}){

  const [quantity, setQuantity] = useState(1);
  const {addItem, isItemAdded} = useBasket();
  const {alert} = useAlert();

  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  const isAdded = isItemAdded(product._id);

  function addToBasket(){
    if(isAdded) return;
    addItem({...product, quantity});
  }

  function bayNow(){

  }

    return (
      <>
        <Head>
          <title>{product.name.slice(0.10)}</title>
        </Head>
        <Header />
        <main className={styles.product_page}>
          <div className={styles.images_container}>
            <ProductImages images={product.images} name={product.name} />
          </div>
          <div className={styles.product_info_container}>
            <h1>{product.name}</h1>
            <div className={styles.rating}>
              <Rating {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
            <h2>${product.price}</h2>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.actions_container}>
            <h2>${product.price}</h2>
            <h3>{
              Number(product.stock) > 0
                ? <span style={{ color: 'green' }}>InStock</span>
                : <span style={{ color: 'red' }}>OutOfStock</span>
            }</h3>
             
             <p style={{ fontSize: '12px'}}>quantity</p>
             <input 
                className={styles.quantity} 
                type="number" 
                placeholder="quantity"
                value={quantity}
                onChange={(e) =>setQuantity(e.target.value)}
              />
            <button 
              onClick={addToBasket} 
              className={styles.add_to_cart}
            >{isAdded?"alerady added":"Add To Cart"}</button>
            <button
              onClick={bayNow}
              className={styles.bay_now}>Bay Now</button>
          </div>
        </main>
        <Reviews product={product} reviews={product.reviews} />
        {alert && (
            <Alert type={alert.type} message={alert.message} />
        )}
      </>
    );
}

function Reviews({ product, reviews }) {

  const {user} = useUser();
  const {setAlert} = useAlert();
  const [review, setReview] = useState({
    rating:0,
    comment:''
  });
  const [show, setShow] = useState(false);

  async function addReview(e) {
    e.preventDefault();

    if(!review.rating){
      return setAlert({
        type:"error",
        message:"Add a rating"
      })
    }
    if(!review.comment){
      return setAlert({
        type:"error",
        message:"Add a comment"
      })
    }

    try {
      let url = "/api/product/review";
      const { data } = await axios.post(url, {
        id:product._id,
        reviews:[...reviews,{
          ...review,
          name:user.info?.name,
          user:user.info?._id
        }]
      });
      if(data.success) {
        setReview({
          rating:0,
          comment:''
        })
        setShow(false);
        setAlert({
          type:"success",
          message:"review added"
        });
      }
    } catch (err) {
      setAlert({
        type:"error",
        message:err.response?.data?.message || err.message
      })
    }
  }

  return (
    <section>
      <div className={styles.reviews}>
        {reviews.map(review => (<Review key={review.user} review={review} />))}
      </div>
      {
        show && (
          <div className={styles.form_container}>
            <form onSubmit={addReview}>
              <h2>Add Your Review</h2>
              <Rating
                onChange={(e) => setReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                value={review.rating}
                size="large"
              />
              <textarea
                placeholder="Enter your comment"
                value={review.comment}
                onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
              />
              <button className={styles.submit_review}>Submit Review</button>
            </form>
          </div>
        )
      }
      <button onClick={() =>setShow(true)} className={styles.add_review}>Add Review</button>
    </section>
  );
}