import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchCoins } from "store/searchCoins/actions";
import { RootState } from "store";
import "./navbar.style.scss";

const Navbar: FC = () => {
   const [value, setValue] = useState("");

   const dispatch = useDispatch();
   const dispatchSearchCoins = () => {
      dispatch(searchCoins(value));
   };

   const { coins } = useSelector((state: RootState) => state.searchCoins);

   const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      debounce(dispatchSearchCoins, 2000)();
   };

   return (
      <nav>
         <div className="left-nav">
            <NavLink
               className={({ isActive }) => (isActive ? "active" : "")}
               to="/"
            >
               Coins
            </NavLink>
            <NavLink
               className={({ isActive }) => (isActive ? "active" : "")}
               to="/Portfolio"
            >
               Portfolio
            </NavLink>
         </div>
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
               <ul>
                  {/* {coins?.map((coin) => (
                     <li>{coin.name}</li>
                  ))} */}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
