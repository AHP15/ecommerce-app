import Head from "next/head";
import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

export default function Orders(){
  const [open, setOpen] = useState(false);

    return (
        <>
          <Head>
            <title>admin | orders</title>
          </Head>
          <main>
            <Sidebar open={!open} setOpen={() =>setOpen(open => !open)}/>
          </main>
        </>
    );
}