import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, CoinPage, Portfolio } from "pages";
import { Navbar } from "components";
import "App.scss";

const App: FC = () => {
   return (
      <div className="App">
         <BrowserRouter>
            <Navbar />
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/Coins/:coin" element={<CoinPage />} />
               <Route path="/Portfolio" element={<Portfolio />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
