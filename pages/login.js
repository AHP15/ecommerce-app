import Head from "next/head";
import { useState } from "react";
import Input from "../components/user/Input";
import Logo from "../components/Logo";
import styles from "../styles/user/Register.module.css";
import Link from "next/link";


export default function Login(){

    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    async function handlerLogin(event){
        event.preventDefault();
    }

    return (
        <>
          <Head>
            <title>login</title>
          </Head>
          <main className={styles.login}>
            <Logo />
            <form onSubmit={handlerLogin} className={styles.register_form}>
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
        </>
    );
}