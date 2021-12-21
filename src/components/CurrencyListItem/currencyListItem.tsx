import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeCurrency } from "store/coinList/actions";

interface CurrencyListItemProps {
   symbol: string;
   code: string;
   query: string;
   closeCoinList: any;
}

const CurrencyListItem: FC<CurrencyListItemProps> = ({
   symbol,
   code,
   query,
   closeCoinList,
}) => {
   const dispatch = useDispatch();
   return (
      <li
         onClick={() => {
            dispatch(changeCurrency(query));
            closeCoinList();
         }}
      >
         <div className="currency-symbol list-symbol">
            <p>{symbol}</p>
         </div>
         <p>{code}</p>
      </li>
   );
};

export default CurrencyListItem;
