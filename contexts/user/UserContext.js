import React, {useState, useContext, useEffect} from 'react';
import axios from "axios";

const UserContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState({
        isLoggedIn:false,
        loading:true,
    });
    
    async function LoadUserData(){
        let url = "/api/user";
        try{
            const {data} = await axios.get(url);
            if(data.success){
                setUser({
                    isLoggedIn:true,
                    info:data.user,
                });
                console.log(data)
            }
        }catch(err){
            setUser({
                isLoggedIn:false,
            });
            localStorage.removeItem("ecommerce-user-loggedIn");
            console.log(err.response?.data?.message ?? err.message);
        }
    }
    useEffect(() =>{
        const userLoggedIn = localStorage.getItem("ecommerce-user-loggedIn");
        if(userLoggedIn){
            LoadUserData();
        }else{
            setUser({
                isLoggedIn:false,
            })
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}