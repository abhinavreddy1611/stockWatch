import React, { useState } from 'react';
export const context = React.createContext();
import StockList from '../componenets/StockList';
import AutoComplete from '../componenets/AutoComplete';
export function StockOverview() {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]); 
    function addStock(stock){
        console.log("came here")   

     if(watchList.indexOf(stock)===-1){
        console.log("came here")   
    setWatchList([...watchList,stock])
     }

    }
     function  deleteStock(stock){
    const filtWatchList=watchList.filter((curr)=>{
        if(stock!==curr) return curr;
    })
    setWatchList(filtWatchList)

    }

    return (
        <context.Provider value={{ watchList, setWatchList,addStock,deleteStock }}>
            <AutoComplete />
            <StockList />
        </context.Provider>
    );
}
