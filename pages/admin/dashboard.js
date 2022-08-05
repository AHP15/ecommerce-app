import Head from "next/head";
import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";


export default function Dashboard(){
    const [open, setOpen] = useState(true);
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