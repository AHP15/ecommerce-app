import Head from "next/head";
import Sidebar from "../../components/admin/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../../styles/admin/Products.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';

export default function Products(){
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() =>{
    if(window.innerWidth > 700){//in a small screen sidebar should close intianly
      setOpen(true);
    }
    //in a small screen if sidebar opened table shold be closed
    if(window.innerWidth < 700 && open){
      setClose(true);
    }
  }, []);
  function handleClick(){
    setClose(close => !close);
    setOpen(open => !open);
  } 

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 250, flex: 1 },
    { field: "stock", headerName: "Stock",type:"number", minWidth: 100, flex: 0.3 },
    { field: "price", headerName: "Price($)",type:"number", minWidth: 270, flex: 0.5 },
    { 
      field:"actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell:(params) =>{
        return (
          <>
            <Button style={{height:"80%"}}>
            <Link href={`/${params.id}`}>
              <a><EditIcon /></a>
            </Link>
            </Button>
            <Button style={{height:"80%"}}>
              <DeleteIcon />
            </Button>
          </>
        )
      }
    }
  ];

  const rows =[{
    id:"1",
    name:"product1",
    stock:20,
    price:50,
  }];
  return (
        <>
          <Head>
            <title>admin | products</title>
          </Head>
          <main className={styles.products}>
            <Sidebar open={open} setOpen={() =>setOpen(open => !open)} />
            <div className={close?styles.products_table_closed:styles.products_table}>
            <div onClick={handleClick} className={styles.close_icon}>
              <CloseIcon />
            </div>
            <h1>ALL PRODUCTS</h1>
              <DataGrid
                 rows={rows}
                 columns={columns}
                 pageSize={10}
                 disableSelectionOnClick
                 autoHeight 
              />
              <Link href="/admin/create">
                <a className={styles.create_btn}>Create product</a>
              </Link>
            </div>
          </main>
        </>
  );
}