import React, {useState, useContext, useEffect} from 'react';

const UserContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState({
        isLoggedIn:false,
    });

    useEffect(() =>{
        console.log(user)
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}