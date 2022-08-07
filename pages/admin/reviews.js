import Head from "next/head";
import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

export default function Reviews(){
  const [open, setOpen] = useState(false);

    return (
        <>
          <Head>
            <title>admin | reviews</title>
          </Head>
          <main>
            <Sidebar open={!open} setOpen={() =>setOpen(open => !open)}/>
          </main>
        </>
    );
}