import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {GET_GLOBAL_DATA, SET_LOADING, SET_ERROR, GlobalDataAction} from './types'

export const getGlobalData = (): ThunkAction<void, RootState, null, GlobalDataAction> => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING })
    
        const res = await fetch(`https://api.coingecko.com/api/v3/global`)

        const { data } = await res.json() 

        dispatch({
            type: GET_GLOBAL_DATA,
            payload: data
        })
       
    } catch(err) {
        dispatch({type: SET_ERROR})
    }
}
