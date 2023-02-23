import React, { useContext, useEffect, useState } from 'react';
import piza from '../../img/piza.jpg';
import cake from '../../img/cake.jpg';
import cofe from '../../img/cofe.jpg';
import apple from '../../img/apple.jpg';
import coke from '../../img/coke.jpg';
import water from '../../img/water.jpg';

const AppContext = React.createContext();



export const AppProvider = ({ children }) => {
    // ############### state
    const [discountList, setDiscountList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeObject, setActiveObject] = useState({});
    const [isOfferBox, setIsOfferBox] = useState(false);

    const fakeData = [
        {name:'Piza',img:piza,id:'1'},
        {name:'Cake',img:cake,id:'2'},
        {name:'Cofe',img:cofe,id:'3'},
        {name:'apple',img:apple,id:'4'},
        {name:'coke',img:coke,id:'5'},
        {name:'water',img:water,id:'6'},
    ];
    // ############func
   
    const getDiscountList = () => {
        setLoading(true);
        fetch(`http://localhost:4000/discounts`,)
            .then(item => item.json())
            .then(item => {
                if (item.status === 'fail') throw new Error(item.message);
                setDiscountList(item.data);
                setLoading(false);
                console.log("---------->,", item.data)
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })
    }
    const deleteDiscount = (id)=>{
        fetch(`http://localhost:4000/discounts/${id}`,{method:'DELETE'})
        .then(item => {
            console.log("Deleted", item)

            if (item.status === 204) {
                console.log("Deleted", item);
                setDiscountList(prev=>prev.filter(item=>item._id!==id));
            }
        })
        .catch(err => {
            console.log("Error in deleteDiscount,", err.name)

        })
    }
    const makeActiveObj = (id)=>{
        discountList.forEach(item=>item._id===id?setActiveObject(item):null);
        setIsOfferBox(true);
    }
  
    // ###########effect
    useEffect(() => {
        getDiscountList();
    }, []);



    return (
        <AppContext.Provider value={{
            discountList,
            error,
            loading,
            makeActiveObj,
            activeObject,
            setActiveObject,
            isOfferBox,
            fakeData,
            deleteDiscount,
        }}>

            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext);
}