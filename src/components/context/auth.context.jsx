import { createContext, useState } from 'react';

export const Authcontext = createContext({
    id: "",
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: ""
})
export const AuthSwapper = (props) => {
    const [User, setUser] = useState({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: ""
    })
    return (
        <Authcontext.Provider value={{ User, setUser }}>
            {props.children}
        </Authcontext.Provider>
    )
}

