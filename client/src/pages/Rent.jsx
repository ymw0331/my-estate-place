import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import React from 'react'
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";


export const Rent = () => {

    const [auth, setAuth] = useAuth();

    const [ads, setAds] = useState()

    useEffect(() => {
        fetchAds()
    }, [])

    const fetchAds = async () => {
        try {
            const { data } = await axios.get("/ads-for-rent")
            setAds(data.ads)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SearchForm />
            <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
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
            {/* <pre>{JSON.stringify({ adsForSell, adsForRent }, nu ll, 3)}</pre> */}
        </>
    )
}

export default Rent;