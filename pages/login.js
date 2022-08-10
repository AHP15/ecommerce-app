import Head from "next/head";
import { useEffect, useState } from "react";
import Input from "../components/user/Input";
import Logo from "../components/Logo";
import styles from "../styles/user/Register.module.css";
import Link from "next/link";
import { useUser } from "../contexts/user/UserContext";
import { useAlert } from "../contexts/AlertContext";
import { useRouter } from 'next/router';
import Alert from "../components/Alert";


export default function Login(){

    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {user, setUser} = useUser();
    const {alert, setAlert} = useAlert();
    const router = useRouter();

    useEffect(() =>{
      if(user.isLoggedIn){
        router.push("/");
     }
    }, [user.isLoggedIn])

    async function handlerLogin(event){
      event.preventDefault();

      if(!address){
        return setAlert({
          inputName:"address",
          type:"error",
          message:"Enter Your phone number or email address"
       });
      }
      if(password.length < 6){
        return setAlert({
           inputName:"password",
           type:"error",
           message:"Password must have At least 6  characters"
        });
      }

      setLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({address,password})
        });

        const data = await response.json();

        if(data.success){
          setUser({
            isLoggedIn:true,
            info:data.user
          })
          localStorage.setItem('ecommerce-user-loggedIn', "true");
        }else{
          setAlert({
            type:"error",
            message:data.message
         })
        }
      }catch(err){
        setAlert({
          type:"error",
          message:err.message
       })
      }finally{
        setLoading(false);
      }
    }

    return (
        <>
          <Head>
            <title>login</title>
          </Head>
          <main className={styles.login}>
            <Logo />
            <form
                style={{filter:loading?"blur(3px)":"blur(0)"}} 
                onSubmit={handlerLogin} className={styles.register_form}>
                <h1>Sign-In</h1>
                <Input
                  options={{
                     type: 'text',
                     name: 'address',
                     value: address,
                     onChange:(e) => setAddress(e.target.value),
                  }}
                  label="Mobile number or email"
                />
                <Input
                  options={{
                     type: 'password',
                     name: 'password',
                     value: password,
                     placeholder: 'At leats 6  characters',
                     onChange:(e) => setPassword(e.target.value),
                  }}
                  label="Password"
                />
                <button type="submit">Sing In</button>
                <Link href="/register">
                   <a className={styles.register_link}>Create an account</a>
                </Link>
            </form>
          </main>

          {alert && (
            <Alert type={alert.type} message={alert.message} />
           )}
        </>
    );
}