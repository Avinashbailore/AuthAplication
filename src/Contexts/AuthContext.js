import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../FireBase/firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged = (user) => setCurrentUser(user);
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        signUp
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
