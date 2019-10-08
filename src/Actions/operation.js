import {
    SET_OPERATION,
    SET_DARK_MODE
} from './constants';

export const setOperation = (operation, color) => {
    return{
        type: SET_OPERATION,
        payload: {operation, color}
    }
}

export const setDarkMode = (bool) => {
    return{
        type: SET_DARK_MODE,
        payload: bool
    }
}