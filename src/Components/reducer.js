import {combineReducers} from 'redux'
import listMovies from './redux/reducer'

const reducer = combineReducers ({
    data: listMovies
})

export default reducer