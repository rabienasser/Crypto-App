import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, CoinPage, Portfolio } from "pages";
import "App.scss";

const App: FC = () => {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/coins/:coin" element={<CoinPage />} />
               <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
