import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';
import { GOOGLE_PLACES_KEY } from "../../config";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { useAuth } from "../../contexts/auth";


export const AdForm = ({ action, type }) => {

    //context
    const [auth, setAuth] = useAuth()

    //state
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: '',
        adrress: '',
        bedrooms: '',
        bathrooms: '',
        carpark: '',
        landsize: '',
        title: '',
        description: '',
        loading: false,
        type,
        action
    })

    // hooks
    const navigate = useNavigate()

    const handleClick = async () => {

        try {
            setAd({ ...ad, loading: true })
            const { data } = await axios.post('/ad', ad)
            console.log('ad create response =>', data)

            if (data?.error) {
                toast.error(data.error)
                setAd({ ...ad, loading: false })
            } else {

                //data {user,ad}
                setAuth({ ...auth, user: data.user })

                //update user in context
                const fromLS = JSON.parsee(localStorage.getItem("auth"))
                fromLS.user = data.user
                localStorage.setItem("auth", JSON.stringify(fromLS))


                //update user in local storage
                toast.success("Ad created successfully")
                setAd({ ...ad, loading: false })

                // navigate("/dashboard")

                //relaod page on redirect 
                window.location.href = '/dashboard'
            }

        } catch (err) {
            console.log(err)
            setAd({ ...ad, loading: false })
        }
    }

    return (
        <>
            <div className="mb-3 p-5 form-control">

                <ImageUpload ad={ad} setAd={setAd} />

                <GooglePlacesAutocomplete
                    apiKey={GOOGLE_PLACES_KEY}
                    apiOptions="my"
                    selectProps={{
                        defaultInputValue: ad?.address,
                        placeholder: "Search for address...",
                        onChange: ({ value }) => {
                            setAd({ ...ad, address: value.description })
                        }
                    }}
                />
                <div style={{ marginTop: "80px" }}>
                    <CurrencyInput
                        placeholder="Enter price"
                        defaultValue={ad.price}
                        className="form-control mb-3"
                        onValueChange={(value) => setAd({ ...ad, price: value })}
                    />
                </div>



                {type === "House" ? (
                    <>
                        <input
                            type="number"
                            min="0"
                            className="form-control mb-3"
                            placeholder="Enter how many bedrooms"
                            value={ad.bedrooms}
                            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                        />

                        <input
                            type="number"
                            min="0"
                            className="form-control mb-3"
                            placeholder="Enter how many bathrooms"
                            value={ad.bathrooms}
                            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                        />

                        <input
                            type="number"
                            min="0"
                            className="form-control mb-3"
                            placeholder="Enter how many carpark"
                            value={ad.carparks}
                            onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                        />

                    </>
                ) : ""}


                <input
                    type="text"
                    min="0"
                    className="form-control mb-3"
                    placeholder="Size of land"
                    value={ad.landsize}
                    onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
                />

                <input
                    type="text"
                    min="0"
                    className="form-control mb-3"
                    placeholder="Enter title"
                    value={ad.title}
                    onChange={(e) => setAd({ ...ad, title: e.target.value })}
                />

                <textarea
                    type="text"
                    min="0"
                    className="form-control mb-3"
                    placeholder="Enter description"
                    value={ad.description}
                    onChange={(e) => setAd({ ...ad, description: e.target.value })}
                />

                <button
                    onClick={handleClick}
                    className={`btn btn-primary ${ad?.loading ? 'disabled' : ""} mb-5`} >
                    {ad.loading ? "Saving..." : "Submit"}
                </button>


                {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
            </div>

        </>
    )
}
