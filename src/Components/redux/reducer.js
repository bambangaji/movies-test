import * as actionName from '../redux/string';

const initialState = {
    movies:[]
}

const listMovies =(state=initialState,action)=>{
    const _action ={
        [actionName.GET_DATA] : () => {
        return {
                ...state,
                action:action.type,
                movies:state
            }
        },
        DEFAULT:() => state
    } 
    return (_action[action.type] || _action.DEFAULT ) ()
}
export default listMovies