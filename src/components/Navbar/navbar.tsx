import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSearch,
   faCaretDown,
   faBars,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "store";
import { searchCoins } from "store/searchCoins/actions";
import { getCoinsByMarketCap, getCoinsByVolume } from "store/coinList/actions";
import { CurrencyListItem } from "components";
import { showCurrencySymbol } from "utils/currencyConversions/showCurrencySymbol";
import useWindowSize from "hooks/useWindowSize";
import "./navbar.style.scss";

const Navbar: FC = () => {
   const [value, setValue] = useState("");
   const [isSearchList, setSearchList] = useState(false);
   const [isCurrencyList, setCurrencyList] = useState(false);
   const [isHamburgerMenu, setHamburgerMenu] = useState(false);

   const { pathname } = useLocation();
   const size = useWindowSize();

   const dispatch = useDispatch();

   const { coins } = useSelector((state: RootState) => state.searchCoins);
   const { currency, marketCap, top } = useSelector(
      (state: RootState) => state.coinList
   );

   const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      if (value !== "") {
         dispatch(searchCoins(value));
      }
   };

   const handleCurrencyList = () => {
      setCurrencyList(!isCurrencyList);
   };

   const handleHamburgerMenu = () => {
      setHamburgerMenu(!isHamburgerMenu);
   };

   const closeSearchList = () => {
      setSearchList(false);
   };

   const closeCoinList = () => {
      setCurrencyList(false);
   };

   useEffect(() => {
      document.addEventListener("click", closeSearchList);
      return () => {
         document.removeEventListener("click", closeSearchList);
      };
   }, []);

   useEffect(() => {
      if (value === "") {
         setSearchList(false);
      } else {
         setSearchList(true);
      }
   }, [value]);

   useEffect(() => {
      setValue("");
      setHamburgerMenu(false);
   }, [pathname]);

   useEffect(() => {
      marketCap
         ? dispatch(getCoinsByMarketCap(top))
         : dispatch(getCoinsByVolume(top));
   }, [currency]);

   return (
      <nav>
         {size.width! > 600 && (
            <div className="left-nav">
               <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/"
               >
                  Coins
               </NavLink>
               <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/portfolio"
               >
                  Portfolio
               </NavLink>
            </div>
         )}

         <div className="right-nav">
            <div className="input">
               <div>
                  <FontAwesomeIcon className="icon" icon={faSearch} />
               </div>
               <input
                  type="text"
                  placeholder="Search..."
                  value={value}
                  onChange={handleChange}
               />
               {isSearchList && (
                  <ul>
                     {coins?.map((coin) => (
                        <Link to={`coins/${coin.name}`} key={coin.name}>
                           {coin.name}
                        </Link>
                     ))}
                  </ul>
               )}
            </div>
            <div className="currency">
               <button className="active" onClick={handleCurrencyList}>
                  <div className="currency-symbol">
                     <p>{showCurrencySymbol(currency)}</p>
                  </div>
                  <p>{currency.toUpperCase()}</p>
                  <FontAwesomeIcon className="icon" icon={faCaretDown} />
               </button>

               {isCurrencyList && (
                  <ul>
                     <CurrencyListItem
                        symbol="$"
                        code="USD"
                        query="usd"
                        closeCoinList={closeCoinList}
                     />
                     <CurrencyListItem
                        symbol="£"
                        code="GBP"
                        query="gbp"
                        closeCoinList={closeCoinList}
                     />
                     <CurrencyListItem
                        symbol="€"
                        code="EUR"
                        query="eur"
                        closeCoinList={closeCoinList}
                     />
                     <CurrencyListItem
                        symbol="¥"
                        code="JP¥"
                        query="jpy"
                        closeCoinList={closeCoinList}
                     />
                  </ul>
               )}
            </div>
         </div>

         {size.width! <= 600 && (
            <div className="hamburger-menu">
               <FontAwesomeIcon
                  onClick={handleHamburgerMenu}
                  icon={faBars}
                  className="hamburger-icon"
               />
               {isHamburgerMenu && (
                  <ul>
                     <Link to="/">Coins</Link>
                     <Link to="/portfolio">Portfolio</Link>
                  </ul>
               )}
            </div>
         )}
      </nav>
   );
};

export default Navbar;
