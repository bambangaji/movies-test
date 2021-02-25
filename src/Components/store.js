import {createStore,applyMiddleware,Store} from 'redux'
import {persistStore,persistReducer,Persistor} from 'redux-persist'
import logger from 'redux-logger'
import reducer from './reducer'
import storage from 'redux-persist/lib/storage'

const persistedReducer = persistReducer({key:'root',storage},reducer)
export const store = createStore(persistedReducer,{},applyMiddleware(logger))
export const persistor = persistStore(store)