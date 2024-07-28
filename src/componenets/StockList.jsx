import React, { useState, useEffect,useContext } from 'react';
import finhub from '../apis/finhub';
import { context } from '../pages/StockOverview';
import {useNavigate} from "react-router-dom"
function StockList() {
    const navigate=useNavigate()
  const [stocks, setStocks] = useState([]); // Initialize as an empty array
  const {watchList,setWatchList}=useContext(context)
  useEffect(() => {
    console.log("useEffect triggered");

    let isMounted = true; // flag to handle component unmount

    async function getStock() {
      try {
        const results = await Promise.all(
          watchList.map((value) =>
            finhub.get("/quote", {
              params: { symbol: value }
            })
          )
        );

        if (isMounted) {
          // Map results to add the symbol to each stock data
          const finalResults = results.map((response, index) => ({
            symbol: watchList[index],
            data: response.data
          }));

          setStocks(finalResults);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    getStock();

    return () => {
      isMounted = false; // Cleanup function to avoid state updates on unmounted component
    };
  }, [watchList]); // Dependency array

  function changeColor(data) {
    return data > 0 ? "success" : "danger";
  }

  function renderIcon(data) {
    return data > 0 ? <span>▲</span> : <span>▼</span>; // Added icons for clarity
  }
  function handleStockSelect(symbol){
navigate(`detail/${symbol}`)
  }

  return (
    <>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pcl</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map((stockData) => (
              <tr onClick={()=>{
                handleStockSelect(stockData.symbol)
              }} key={stockData.symbol}>
                <th scope="row">{stockData.symbol}</th>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d}
                </td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.dp}
                  {renderIcon(stockData.data.d)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default StockList;
