import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Header from "../components/home/Header";
import { useAlert } from "../contexts/AlertContext";
import { useUser } from "../contexts/user/UserContext";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const {user} = useUser();
  const {alert, setAlert} = useAlert();
  
  async function getOrders(){
    try{
      let url = "/api/order"
      const {data} = await axios.get(url);
    }catch(err){
      setAlert({
        type:"error",
        message:err.response?.data?.message ?? err.message
      })
    }
  }
  useEffect(() => {

  }, []);

  return (
    <>
      <Head>
        <title>orders</title>
      </Head>
      <Header />
      <main>

      </main>
      {alert && (
        <Alert type={alert.type} message={alert.message} />
      )}
    </>
  );
}