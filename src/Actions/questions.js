import {
    SET_QUESTION_COUNTER,
} from './constants';

export const setQuestionNumber = (operation, number) => {
    return{
        type: SET_QUESTION_COUNTER,
        payload: {operation, number}
    }
}