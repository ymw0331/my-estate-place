import React, { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const Register = () => {

    // states
    const [email, setEmail] = useState("ymw0331@hotmail.com")
    const [password, setPassword] = useState("ymw0331")
    const [loading, setLoading] = useState(false);


    // hooks
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // console.log(email, password);
            const { data } = await axios.post(`/pre-register`, {
                email,
                password,
            });

            if (data?.error) {
                toast.error(data.error)
                setLoading(false)
            } else {
                toast.success("Please check your email to complete registration.")
                setLoading(false)
                navigate("/")
            
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
            <h1 className="display-1 bg-primary text-light p-5">Register</h1>

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

                            <button disable={loading} className="btn btn-primary col-12 mb-4">{loading ? "Waiting..." : "Register"}</button>

                        </form>

                    </div>
                </div>
            </div>

        </>

    )
}


export default Register;