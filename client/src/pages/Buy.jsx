import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import React from 'react'
import axios from "axios";
import AdCard from "../components/cards/AdCard";

export const Buy = () => {

    const [auth, setAuth] = useAuth();

    const [ads, setAds] = useState()

    useEffect(() => {
        fetchAds()
    }, [])

    const fetchAds = async () => {
        try {
            const { data } = await axios.get("/ads-for-sell")
            setAds(data.ads)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">For Sell</h1>
            <div className="container">
                <div className="row">
                    {ads?.map((ad) => (
                        <AdCard
                            ad={ad}
                            key={ad._id}
                        />
                    ))}
                </div>
            </div>



            {/* <pre>{JSON.stringify({ adsForSell, adsForRent }, null, 3)}</pre> */}
        </>
    )
}

export default Buy;