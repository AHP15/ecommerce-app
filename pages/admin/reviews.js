import Head from "next/head";
import Sidebar from "../../components/admin/Sidebar";

export default function Reviews(){
    return (
        <>
          <Head>
            <title>admin | reviews</title>
          </Head>
          <main>
            <Sidebar />
          </main>
        </>
    );
}