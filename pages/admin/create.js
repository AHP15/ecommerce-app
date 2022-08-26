import Head from "next/head";
import { useState } from "react";
import Input from "../../components/user/Input";
import styles from "../../styles/admin/Create.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import Image from "next/image";
import {useAlert} from "../../contexts/AlertContext";
import Alert from "../../components/Alert";
import axios from "axios";
import { useUser } from "../../contexts/user/UserContext";
import { useEffect } from "react";
import { useRouter } from 'next/router';


export default function CreateProduct(){

    const [product, setProduct] = useState({
        name:"",
        price:0,
        description:"",
        category:"",
        stock:0,
    });
    const [images, setImages] = useState([]);
    const [imagespreview, setImagespreview] = useState([]);
    const [loading, setLoading] = useState(false);

    const {alert, setAlert} = useAlert();
    const {user} = useUser();
    const router = useRouter();

    useEffect(() =>{
      if(!user.loading && (!user.isLoggedIn || user.info.role !== 'admin')){
        router.push("/login");
      };
    }, [user]);

    const handleChange = (event) => {
        if(event.target.name === "images"){
          const files = Array.from(event.target.files);
          files.forEach(image => {
            const reader = new FileReader();
            setImages(prev => [...prev, image])
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagespreview((old) => [...old, reader.result]);
              }
            };
      
            reader.readAsDataURL(image);
          });
        }else{
            setProduct(product => ({
                ...product,
                [event.target.name]:event.target.value
            }))
        }
    }

    async function handleSubmit(event){
      event.preventDefault();
      
      for(let key of Object.keys(product)){
        if(!product[key]){
          return setAlert({
            inputName:key,
            type:"error",
            message:`Enter a product ${key}`
          });
        }
      }
      setLoading(true);
      const formData = new FormData();

      formData.set("name", product.name);
      formData.set("price",product.price);
      formData.set("description", product.description);
      formData.set("category", product.category);
      formData.set("stock", product.stock);
      images.forEach(image =>{
         formData.append("images", image);
      });


      try{
        const url = "/api/product";
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const {data} = await axios.post(url,formData, config);
        if(data.success){
          
          setProduct({
            name:"",
            price:0,
            description:"",
            category:"",
            stock:0,
          });
          setImages([]);
          setImagespreview([]);
          setAlert({
            type:"success",
            message:"product created successfully"
          });
        }
      }catch(err){
        console.log(err.message)
        setAlert({type:"error", message:err.response?.data?.message ?? err.message});
      }finally{
        setLoading(false);
      }

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
                <div className={styles.imagespreview_container}>
                  {imagespreview.map((image, index) => (
                    <div key={index} className={styles.image_container}>
                      <Image src={image} layout="fill" />
                    </div>
                  ))}
                </div>
                <button 
                  type="submit" 
                  className={styles.create}
                  disabled={loading}
                  >Create Product</button>
            </form>
          </main>

          {alert && (
            <Alert type={alert.type} message={alert.message} />
          )}
        </>
    );
}