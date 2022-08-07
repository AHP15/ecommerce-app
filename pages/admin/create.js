import Head from "next/head";
import { useState } from "react";
import Input from "../../components/user/Input";
import styles from "../../styles/admin/Create.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";


export default function CreateProduct(){

    const [product, setProduct] = useState({
        name:"",
        price:0,
        description:"",
        category:"",
        stock:0,
    });
    const [images, setImages] = useState([])

    const handleChange = (event) => {
        if(event.target.name === "images"){

        }else{
            setProduct(product => ({
                ...product,
                [event.target.name]:event.target.value
            }))
        }
    }

    async function handleSubmit(event){
      fetch("/api/product", {
        method:"POST",
        body:JSON.stringify({ok:"ok"})
      })
    }

    return (
        <>
          <Head>
            <title>admin | create product</title>
          </Head>
          <main>
            <div className={styles.back}>
                <Link href="/admin/dashboard">
                  <a><ArrowBackIcon /></a>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className={styles.product_form}>
                <h1>Create product</h1>
                <Input
                  options={{
                     type: 'text',
                     name: 'name',
                     value:product.name,
                     onChange:handleChange,
                  }}
                  label="Product name"
                />
                <Input
                  options={{
                     type: 'number',
                     name: 'price',
                     value:product.price,
                     onChange:handleChange,
                  }}
                  label="Product price"
                />
                <div className={styles.description_container}>
                    <label htmlFor="description">Product description</label>
                    <textarea
                        name='description'
                        onChange={handleChange}
                        value={product.description}
                    ></textarea>
                </div>
                <Input
                  options={{
                     type: 'text',
                     name: 'category',
                     value:product.category,
                     onChange:handleChange,
                  }}
                  label="Product category"
                />
                <Input
                  options={{
                     type: 'number',
                     name: 'stock',
                     value:product.stock,
                     onChange:handleChange,
                  }}
                  label="Product stock"
                />
                <Input
                  options={{
                     type: 'file',
                     name: 'images',
                     accept:"image/*",
                     onChange:handleChange,
                     multiple: true,
                  }}
                  label="Product images"
                />
                <button type="submit" className={styles.create}>Create Product</button>
            </form>
          </main>
        </>
    );
}