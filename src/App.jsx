import {BrowserRouter,Routes,Route} from "react-router-dom"
import {StockDetail} from "./pages/StockDetail"
import {StockOverview} from "./pages/StockOverview"
import StockHeader from "./componenets/StockHeader"
function App() {

  return (
    <main className="container">
     
      <BrowserRouter>
      <StockHeader/>
      <Routes>

     <Route  path= "/" element={
      <StockOverview/>
     } >

     </Route>

     <Route path="/detail/:symbol" element={
      <StockDetail/>
     }></Route>
           
           
        </Routes>

      </BrowserRouter>
    </main>
  )
}

export default App
