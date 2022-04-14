import './style.css';
import { useReducer } from 'react';
import { DigitButton } from './component/digitbutton';
import { OperationButton } from './component/operationbutton';
export const ACTIONS={
    ADD_DIGIT:'add_digit',
    CLEAR:'clear',
    DELETE_DIGIT:'delete_digit',
    CHOOSE_OPERATION:'choose_operation',
    EVALUATE_OPERATION:'evaluate_operation'


}
const reducer=(state,{type,payload})=>{
switch(type){
    case ACTIONS.ADD_DIGIT:
        if(payload.digit==="0" && state.currentOperand==="0") {return state}
        if(payload.digit==="." && state.currentOperand.includes(".")) {return state}
        return {
            
            ...state,
            currentOperand:`${state.currentOperand || " "}${payload.digit}`
        }
    case ACTIONS.CHOOSE_OPERATION:
       if(state.currentOperand===null &&state.previousOperand===null){
           return state
       }
       if(state.currentOperand===null){
           return{
               ...state,
               operation:payload.operation
           }
       }
       if(state.previousOperand==null){
           return{...state,
            operation:payload.operation,
            previousOperand:state.currentOperand,
            currentOperand:null,
        }
       }
       return{
           ...state,
           previousOperand:evaluate(state),
           currentOperand:null,
           operation:payload.operation,
       }
    case ACTIONS.CLEAR:
        return{
            

        }
    default:
        return state;
    
}
}
function evaluate({currentOperand,previousOperand,operation}){
const prev=parseFloat(previousOperand);
const current=parseFloat(currentOperand);
if(isNaN(prev)||isNaN(current)) return "";
let computation="";
switch(operation){
    case "+":
        computation=prev+current;
        break;
    case "-":
        computation=prev-current; 
        break;  
    case '÷' :
        computation=prev/current; 
        break;   
    case '*':
        computation=prev*current;   
        break; 
}
return computation.toString();
}
const App=()=>{
    const [{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer,{})
     
    return (
    <div className="calculator-grid">
        <div className="output">
            <div className="previous-operand">{previousOperand} {operation}</div>
            <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <button >DEL</button>
        <OperationButton operation="÷" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="span-two">=</button>
    </div>
);
};
export default App;