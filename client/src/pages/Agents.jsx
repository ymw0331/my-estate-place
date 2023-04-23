import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import React from 'react'
import axios from "axios";
import UserCard from "../components/cards/UserCard";

export const Agents = () => {

    //state
    const [agents, setAgents] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAgents()
    }, [])

    const fetchAgents = async () => {
        try {
            const { data } = await axios.get("/agents")
            setAgents(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100"
                style={{ marginTop: "-10%" }}
            >
                <div className="display-1">
                    Loading...
                </div>
            </div>
        )
    }
    
    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Agents</h1>
            <div className="container">
                <div className="row">
                    {
                        agents?.map((agent) => (
                            <UserCard user={agent} />
                        ))
                    }

                </div>
            </div>

        </>
    )
}

export default Agents 