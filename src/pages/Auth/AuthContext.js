import { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getItem("currentUser") || null);

    useEffect(() => {
        const storedUser = getItem("currentUser");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setItem("currentUser", userData);
    };

    const logout = () => {
        setUser(null);
        removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
