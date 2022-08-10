import connectDB from "../../db/connection";
import {ObjectId} from "mongodb";
import Head from "next/head";
import Header from "../../components/home/Header";
import styles from "../../styles/product/Product.module.css";

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
      fallback: false,
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
    }
}

export default function Product({product}){
    console.log(product)
    return (
        <>
          <Head>
            <title>{product.name.slice(0.10)}</title>
          </Head>
          <Header />
          <main className="home">
           <div className={styles.images_container}></div>
           <div></div>
          </main>
        </>
    );
}