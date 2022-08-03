import Header from "../components/home/Header";
import Head from "next/head";
import Banner from "../components/home/Banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>amazon-clone | home</title>
      </Head>
      <Header />
      <main className="home">
        <Banner />
      </main>
    </>
  )
}
