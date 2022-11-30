import { useState, useEffect, useContext, createContext } from "react";

import nookies from "nookies";
import { auth } from './firebaseClient';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            console.log("Auth Changed");
            console.log(user ? user.id : "Nothing");
            if (!user) {
                setUser(null);
                nookies.set(undefined, "token", "", {});
                return;
            }

            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, "token", token, {});
        });
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);