import { data } from "../api";
import * as actionName from '../redux/string';
export const getData = (data) =>({
    type:actionName.GET_DATA,
    movies:data
})