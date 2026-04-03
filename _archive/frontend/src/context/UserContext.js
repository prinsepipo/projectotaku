import { createContext, useState } from 'react';


const UserContext = createContext();

const UserProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('TOKEN') !== null);
    const state = {
        isAuthenticated,
        setIsAuthenticated,
    };

    return (
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserProvider };
export default UserContext;
