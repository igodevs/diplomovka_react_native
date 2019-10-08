import {
    SET_QUESTION_COUNTER
} from '../Actions/constants'

const INITIAL_STATE = { 
    questionAdditionCounter: 1,
    questionSubstractionCounter: 1,
    questionMultiplyingCounter: 1,
    questionDivisionCounter: 1,
    questionExamplesCounter: 1
};

export default  (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_QUESTION_COUNTER:
        console.log("reducer",action.payload)
            switch (action.payload.operation){
                
                case 'addition':
                    return Object.assign({}, state, {questionAdditionCounter: action.payload.number})
                case 'substraction':
                    return Object.assign({}, state, {questionSubstractionCounter: action.payload.number})
                case 'multiplying':
                    return Object.assign({}, state, {questionMultiplyingCounter: action.payload.number})
                case 'division':
                    return Object.assign({}, state, {questionDivisionCounter: action.payload.number})
                case 'examples':
                    return Object.assign({}, state, {questionExamplesCounter: action.payload.number})
            }
            
        default:
            return state;
    }
};