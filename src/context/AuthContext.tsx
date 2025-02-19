import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true); 
            return true;
        }
        setIsAuthenticated(false); 
        return false;

        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false)
        }
    };

    // useEffect(() => {
    //     if (localStorage.getItem("cookieFallBack") === "[]" || localStorage.getItem("cookieFallBack") === null) {
    //         navigate("/sign-in");
    //     }
    //     else {
    //         checkAuthUser();
    //     }
    // }, [])

    useEffect(() => {
        const checkSession = async () => {
            const isAuthenticated = await checkAuthUser();
            if (!isAuthenticated) {
                navigate("/sign-in");
            }
        };
        checkSession();
    }, []);

    const value = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);