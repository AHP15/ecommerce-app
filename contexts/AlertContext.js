import React, {useState, useContext} from 'react';

const AlertContext = React.createContext();

export function useAlert(){
    return useContext(AlertContext);
}

export function AlertProvider({children}){

    const [alert, setAlert] = useState(null);

    return (
        <AlertContext.Provider value={{alert, setAlert}}>
            {children}
        </AlertContext.Provider>
    );
}