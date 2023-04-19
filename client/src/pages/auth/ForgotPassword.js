import React, { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {

    // states
    const [email, setEmail] = useState("johnturner1212@gmail.com")
    const [loading, setLoading] = useState(false);

    // hooks
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // console.log(email, password);
            const { data } = await axios.post(`/forgot-password`, {
                email,
            });

            if (data?.error) {
                toast.error(data.error)
                setLoading(false)
            } else {

                toast.success("Please check your email for password reset link.")
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
            <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>

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

                            <button disable={loading} className="btn btn-primary col-12 mb-4">{loading ? "Waiting..." : "Submit"}</button>

                        </form>

                        <Link className="text-danger" to="/auth/forgot-password">Back to login</Link>

                    </div>
                </div>
            </div>

        </>

    )
}


export default Login;