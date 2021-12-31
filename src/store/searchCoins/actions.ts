import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {SEARCH_COINS, SET_LOADING, SET_ERROR, SearchCoinsAction} from './types'

export const searchCoins = (inputValue: string): ThunkAction<void, RootState, null, SearchCoinsAction> => async (dispatch) => {
    try {
        // dispatch({ type: SET_LOADING })
    
        const res = await fetch(`https://crypto-app-server.herokuapp.com/coins/${inputValue}`)

        const data = await res.json()

        dispatch({
            type: SEARCH_COINS,
            payload: data
        })
       
    } catch(err) {
        dispatch({type: SET_ERROR})
    }
}

export default searchCoins