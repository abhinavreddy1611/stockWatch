import React, { useState, useEffect, useContext } from 'react';
import finhub from '../apis/finhub';
import { context } from '../pages/StockOverview';  // Ensure correct import path

function AutoComplete() {
    const [search, setSearch] = useState("");
    const [result, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const { addStock } = useContext(context);  // Only destructure what's needed

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finhub.get("/search", {
                    params: { q: search }
                });
                if (isMounted) {
                    console.log("Search results:", response.data.result);
                    setResults(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (search.length > 0) fetchData();
        else setResults([]);
        return () => {
            isMounted = false;
        };
    }, [search]);

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <input
                style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
                id="search"
                type="text"
                className='form-control'
                placeholder='search'
                autoComplete='off'
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
              
                value={search}
            />
            <ul className={`dropdown-menu ${isFocused ? "show" : ""}`} style={{
                maxHeight: '200px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                cursor: 'pointer'
            }}>
                {result.length === 0 ? (
                    <>Loading....</>
                ) : (
                    result.map((res) => (
                        <li 
                            key={res.symbol} 
                            onClick={() => {
                                addStock(res.symbol);
                                console.log(res.symbol)
                                setResults("")
                                setIsFocused(false)
                            }}
                        >
                            {res.description} {res.symbol}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default AutoComplete;
