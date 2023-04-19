import React from 'react'
import { useAuth } from "../contexts/auth";

export const Home = () => {

    const [auth, setAuth] = useAuth();

    return (

        <>
            <h1 className="display-1 bg-primary text-light p-5"> Home</h1>

            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </>

    )
}

export default Home;