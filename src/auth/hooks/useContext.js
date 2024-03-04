import React from 'react'

export const  useContext = (state = {}, action) => {
    switch (key) {
        case 'login':
            
            return {
                isAuth: true,
                user: action.payloadm
            };
        case 'logout':
            return {
                isAuth: false
            }    
    
        default:
            return state;
    }
}
