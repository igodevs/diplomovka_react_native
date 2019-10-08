import {StyleSheet} from 'react-native';

export const containterStyle = (bool) => {
    return {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: !bool ?'white':'black'
    }
}

export const containerLoginStyle = (bool) => {
    return {
        backgroundColor: !bool ?'white':'black', 
        height: '100%'
    }
}


export const textStyle = (bool) => {
    return{
        flex: 1,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: bool ? 'white' : 'black',
        fontSize: 18,

    }
}