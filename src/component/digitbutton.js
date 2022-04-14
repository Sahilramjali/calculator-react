import {ACTIONS} from '../app';
export const DigitButton=({digit,dispatch})=>{
    return<button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</button>
}