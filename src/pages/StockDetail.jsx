import React , {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import finhub from '../apis/finhub';
export function StockDetail() {
    const {symbol}=useParams();
    console.log(symbol)
    useEffect(()=>{
         const  fetchData= async ()=>{
            const date=new Date();
            const currentTime=Math.floor(date.getTime()/1000)
            const fromTime=currentTime-60*60*24*3
            const response= await finhub.get(("/"),{
               params:{

                symbol, 
                from:currentTime-fromTime,
                to:currentTime,
                resolution:30

               }

            })
            console.log(response)
        }
        fetchData();
    },[])
  return (
    <div>StockDetail {symbol}</div>
  )
}

