import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import coinListReducer from './coinList/coinListReducer'

const rootReducer = combineReducers({
    coinList: coinListReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export default store;