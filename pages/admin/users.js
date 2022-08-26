import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/admin/Products.module.css';
import { useUser } from "../../contexts/user/UserContext";
import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function Users(){
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user.loading && (!user.isLoggedIn || user.info.role !== 'admin')) {
      router.push("/login");
    };
  }, [user]);

  useEffect(() =>{
    if(window.innerWidth > 700){//in a small screen sidebar should close intianly
      setOpen(true);
    }
    //in a small screen if sidebar opened table shold be closed
    if(window.innerWidth < 700 && open){
      setClose(true);
    }
  }, []);


  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "address", headerName: "Address", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    { 
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell:(params) =>(
        <>
          <Button style={{height:"80%"}}>
          <Link href={`/admin/user/${params.getValue(params.id, "id")}`}>
            <EditIcon />
          </Link>
          </Button>
          <Button style={{height:"80%"}}>
              <DeleteIcon />
          </Button>
        </>
      )
    }
  ];

  const rows = [{
    id:"1",
    address:"admin@gmail.com",
    name:"Admin",
    role:"admin",
  }]

  function handleClick(){
    setClose(close => !close);
    setOpen(open => !open);
  }
  return (
        <>
          <Head>
            <title>admin | users</title>
          </Head>
          <main>
            <Sidebar open={open} setOpen={() =>setOpen(open => !open)}/>

            <div className={close?styles.users_table_closed:styles.users_table}>
              <div onClick={handleClick} className={styles.close_icon}>
                <CloseIcon />
              </div>
              <h1>ALL USERS</h1>
              <DataGrid
                 rows={rows}
                 columns={columns}
                 pageSize={10}
                 disableSelectionOnClick
                 autoHeight 
              />
            </div>
          </main>
        </>
  );
}