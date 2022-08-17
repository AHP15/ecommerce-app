import Header from "../components/home/Header";
import Head from "next/head";
import Banner from "../components/home/Banner";
import ProductCard from "../components/product/ProductCard";
import connectDB from "../db/connection";

export default function Home({products}) {
  return (
    <>
      <Head>
        <title>amazon-clone | home</title>
      </Head>
      <Header />
      <main className="home">
        <Banner />
        <section className="product_section">
          {
            products.map(product => <ProductCard key={product._id} product={product} />)
          }
        </section>
      </main>
    </>
  )
}

export async function getStaticProps(){
  let products = []
  try{

    const DB = await connectDB();
    const Product = DB.collection("products");
    products = await Product.find({}).toArray();

    //make the _id field JSON serializable
    products = products.map(product => ({...product, _id:String(product._id)}));
    console.log(products);

  }catch(err){
    console.log(err.message);
  }

  return {
    props: {
      products
    }, 
  }
}
