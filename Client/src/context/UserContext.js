import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Initial state for authentication
const initialState = {
    token: localStorage.getItem('token') || '', // Retrieve token from localStorage if exists
    isAuthenticated: !!localStorage.getItem('token'), // Set true if token exists
};

// Reducer to manage user authentication state
function userReducer(state, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, token: '', isAuthenticated: false };
        default:
            return state;
    }
}

// UserContextProvider component to wrap the app and provide the state
export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    // Sync state with localStorage (to persist across page reloads)
    useEffect(() => {
        if (state.token) {
            localStorage.setItem('token', state.token);
        } else {
            localStorage.removeItem('token');
        }
    }, [state.token]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use UserContext in other components
export function useUserContext() {
    return useContext(UserContext);
}

export { UserContext };
