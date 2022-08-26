import React, {useState, useContext, useEffect} from 'react';

const BasketContext = React.createContext();

export function useBasket(){
    return useContext(BasketContext);
}

export function BasketProvider({children}){

    const [basket, setBasket] = useState([]);

    function addItem(item){
        setBasket(prev => [...prev, item]);
    }

    function removeItem(id){
        setBasket(prev => prev.filter(item => item._id !== id));
    }

    function changeQuantity(quantity,id){
        setBasket(prev => {
            return prev.map(item => {
                if(item._id !== id) return item;
    
                item.quantity = quantity;
                return item;
            })
        });
    }
    const isItemAdded = (id) => basket.findIndex((item) => item._id === id) !== -1;
    const subtotal = () => {
        let total = 0;
        basket.forEach(item => total += item.price * item.quantity);
        return total;
    };

    useEffect(() =>{
        if(basket?.length > 0){//Not the first render
            localStorage.setItem("basket", JSON.stringify(basket))
        };
    }, [basket]);

    useEffect(() =>{
        if(JSON.parse(localStorage.getItem("basket"))){
            setBasket(JSON.parse(localStorage.getItem("basket")))
        }
    },[])

    
    const value = {addItem, removeItem, changeQuantity,isItemAdded,subtotal, basket }
    return (
        <BasketContext.Provider value={value}>
            {children}
        </BasketContext.Provider>
    );
}