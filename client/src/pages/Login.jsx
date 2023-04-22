import React, { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";


export const Login = () => {

    //contexts
    const [auth, setAuth] = useAuth()

    // states
    const [email, setEmail] = useState("johnturner1212@gmail.com")
    const [password, setPassword] = useState("john1212")
    const [loading, setLoading] = useState(false);

    // hooks
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // console.log(email, password);
            const { data } = await axios.post(`/login`, {
                email,
                password,
            });

            if (data?.error) {
                toast.error(data.error)
                setLoading(false)
            } else {
                setAuth(data)
                localStorage.setItem("auth", JSON.stringify(data))
                toast.success("Login successful.")
                setLoading(false)
                location?.state !== null ?
                    navigate(location.state) : navigate("/dashboard")

            }
            console.log(data)
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Try again.");
            setLoading(false);
        }
    }
    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Login</h1>

            <div className="container">

                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="form-control mb-4"
                                required
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-control mb-4"
                                required
                                autoFocus
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            ></input>

                            <button disable={loading} className="btn btn-primary col-12 mb-4">{loading ? "Waiting..." : "Login"}</button>

                        </form>

                        <Link className="text-danger" to="/auth/forgot-password">Forgot password</Link>

                    </div>
                </div>
            </div>

        </>

    )
}


export default Login;