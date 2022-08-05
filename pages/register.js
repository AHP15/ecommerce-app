import Head from "next/head";
import { useEffect, useState } from "react";
import Input from "../components/user/Input";
import Logo from "../components/Logo";
import { useAlert } from "../contexts/AlertContext";
import styles from "../styles/user/Register.module.css";
import Alert from "../components/Alert";
import { useRouter } from 'next/router';
import { useUser } from "../contexts/user/UserContext";

export default function Register(){

   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [password, setPassword] = useState("");
   const [duplicate, setDuplicate] = useState("");// duplicate password

   const {alert, setAlert} = useAlert();
   const {user, setUser} = useUser();
   const router = useRouter();

   useEffect(() =>{
      if(user.isLoggedIn){
         router.push("/");
      }
   },[user.isLoggedIn]);
   
   async function handleRegsiter(event) {
      event.preventDefault();

      if(!name){
         return setAlert({
            inputName:"name",
            type:"error",
            message:"Enter Your full name"
         });
      }
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
      if(password !== duplicate){
         return setAlert({
            inputName:"duplicate",
            type:"error",
            message:"Passwords does not match"
         });
      }

      try{
         const response = await fetch("/api/auth/register", {
            method: 'POST',
            body: JSON.stringify({name, address, password}),
            headers: {
               'Content-Type': 'application/json'
            },
         });
         const data = await response.json();
         if(data.success) {
            setUser({
               isLoggedIn:true,
               info:data.user
            });
         }
      }catch(err){
         setAlert({
            type:"error",
            message:err.message
         })
      }
   }

    return (
        <>
           <Head>
            <title>Sing Up</title>
           </Head>
           <main className={styles.register}>
             <Logo />
             <form onSubmit={handleRegsiter} className={styles.register_form}>
                <h1>Sign-In</h1>
                <Input
                  options={{
                     type: 'text',
                     name: 'name',
                     value:name,
                     placeholder: 'First and last name',
                     onChange:(e) => setName(e.target.value),
                  }}
                  label="Your name"
                />
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
                     placeholder: 'At least 6  characters',
                     onChange:(e) => setPassword(e.target.value),
                  }}
                  label="Password"
                />
                <Input
                  options={{
                     type: 'password',
                     name: 'duplicate',
                     value: duplicate,
                     onChange:(e) => setDuplicate(e.target.value),
                  }}
                  label="Re-enter password"
                />
                <button type="submit">Sing Up</button>
             </form>
           </main>

           {alert && (
            <Alert type={alert.type} message={alert.message} />
           )}
        </>
    );
}