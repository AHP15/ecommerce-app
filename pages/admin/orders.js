import Head from "next/head";
import Sidebar from "../../components/admin/Sidebar";

export default function Orders(){
    return (
        <>
          <Head>
            <title>admin | orders</title>
          </Head>
          <main>
            <Sidebar />
          </main>
        </>
    );
}