import React, { FC } from "react";
import HomePage from "./pages/homePage";
import "./_App.scss";

const App: FC = () => {
   return (
      <div className="App">
         <HomePage />
      </div>
   );
};

export default App;
