import Head from "next/head";
import Sidebar from "../../components/admin/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../../styles/admin/Products.module.css";
import { useState } from "react";
import Link from "next/link";
import { style } from "@mui/system";

export default function Products(){
  const [open, setOpen] = useState(true); 

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
            <div className={open?styles.products_table:styles.products_table_closed}>
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