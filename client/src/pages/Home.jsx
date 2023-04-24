import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import React from 'react'
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

export const Home = () => {

    const [auth, setAuth] = useAuth();

    const [adsForSell, setAdsForSell] = useState()
    const [adsForRent, setAdsForRent] = useState()

    useEffect(() => {
        fetchAds()
    }, [])

    const fetchAds = async () => {
        try {
            const { data } = await axios.get("/ads")
            setAdsForRent(data.adsForRent)
            setAdsForSell(data.adsForSell)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SearchForm />
            <h1 className="display-1 bg-primary text-light p-5">For Sell</h1>
            <div className="container">
                <div className="row">
                    {adsForSell?.map((ad) => (
                        <AdCard
                            ad={ad}
                            key={ad._id}
                        />
                    ))}
                </div>
            </div>


            <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
            <div className="container">
                <div className="row">
                    {adsForRent?.map((ad) => (
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

export default Home;