import React, {useState, useContext} from 'react';

const UserContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState({
        isLoggedIn:false,
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}