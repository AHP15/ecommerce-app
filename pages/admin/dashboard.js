import Head from "next/head";
import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { useUser } from "../../contexts/user/UserContext";
import { useEffect } from "react";
import { useRouter } from 'next/router';


export default function Dashboard(){
    const [open, setOpen] = useState(true);

    const {user} = useUser();
    const router = useRouter();
    useEffect(() =>{
        if(!user.loading && (!user.isLoggedIn || user.info.role !== 'admin')){
          router.push("/login");
        };
      }, [user]);

    return (
        <>
           <Head>
            <title>admin | Dashboard</title>
           </Head>
           <main>
            <Sidebar open={open} setOpen={() =>setOpen(open => !open)} />
           </main>
        </>
    );
}