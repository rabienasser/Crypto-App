import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import coinListReducer from './coinList/coinListReducer'
import globalDataReducer from './globalData/globalDataReducer'
import searchCoinsReducer from './searchCoins/searchCoinsReducer'

const rootReducer = combineReducers({
    coinList: coinListReducer,
    globalData: globalDataReducer,
    searchCoins: searchCoinsReducer
})


const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export type RootState = ReturnType<typeof rootReducer>

export default store;