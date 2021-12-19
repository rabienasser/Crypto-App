import { FC } from "react";
import { useParams } from "react-router-dom";

const CoinPage: FC = () => {
   const { coin } = useParams();

   return (
      <div className="coin-page">
         <h1>{coin}</h1>
      </div>
   );
};

export default CoinPage;
