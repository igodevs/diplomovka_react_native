import {
    SET_OPERATION,
    SET_DARK_MODE,
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../Actions/constants'

const INITIAL_STATE = { 
    email: '', 
    password: '',
    loading: false,
    error: '',
    user: null,
    operation: '',
    color: 'white',
    darkMode: false
};

export default  (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentification Failed.', password: '', loading: false };
        case SET_OPERATION:
            return Object.assign({}, state, {operation: action.payload.operation, color: action.payload.color})
        case SET_DARK_MODE:
            return Object.assign({}, state, {darkMode: action.payload})
        default:
            return state;
    }
};