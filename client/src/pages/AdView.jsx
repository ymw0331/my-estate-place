import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ImageGallery from "../components/misc/ImageGallery";
import Logo from '../logo.svg'
import AdFeatures from "../components/cards/AdFeatures";
import { formatNumber } from "../helpers/ad";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import MapCard from "../components/cards/MapCard";
import LikeUnlike from "../components/misc/LikeUnlike";
import HTMLRenderer from 'react-html-renderer'
import AdCard from "../components/cards/AdCard";

dayjs.extend(relativeTime) //fromNow() // 3hours ago


export default function AdView() {
    //state
    const [ad, setAd] = useState({})
    const [related, setRelated] = useState([])

    //hooks
    const params = useParams()

    useEffect(() => {
        if (params?.slug) fetchAd();
    }, [params?.slug])

    const fetchAd = async () => {
        try {
            const { data } = await axios.get(`/ad/${params.slug}`)
            setAd(data?.ad)
            setRelated(data?.related)
        } catch (err) {
            console.log(err)
        }
    }

    const generatePhotosArray = (photos) => {
        if (photos?.length > 0) {
            const x = photos?.length === 1 ? 2 : 4
            let arr = []
            photos.map((p) => arr.push({
                src: p.Location,
                width: x,
                height: x
            }))
            return arr
        } else {
            return [{
                src: Logo,
                width: 2,
                height: 1
            }]
        }
    }

    return <>
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-lg-4">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary disable mt-2">
                            {ad.type} for {ad.action}
                        </button>
                        <LikeUnlike ad={ad} />
                    </div>
                    <div className="mt-4 mb-4"> {ad?.sold ? "❌ Off market " : "✅ In market"}</div>
                    <h1>{ad?.address}</h1>
                    <AdFeatures ad={ad} />
                    <h3 className="mt-4 h2">
                        {formatNumber(ad.price)}
                    </h3>
                    <p className="text-muted">{dayjs(ad?.createdAt).fromNow()}</p>
                </div>
                <div className="col-lg-8">
                    <ImageGallery photos={generatePhotosArray(ad?.photos)} />
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <MapCard ad={ad} />

                    <br />
                    <h1>{ad?.type} in {ad?.address} for {ad?.action} ${ad?.price}</h1>

                    <AdFeatures ad={ad} />
                    <hr />
                    <h3 className="fw-bold">{ad?.title}</h3>

                    <HTMLRenderer
                        html=
                        {ad?.description?.replaceAll(".", "<br/><br/>")}
                    />

                </div>
            </div>
        </div>
        <div className="container-fluid">
            <h4 className="text-center mb-3">Related Properties</h4>
            <hr style={{ width: "33%"}} />

            <div className="row">
                {related?.map((ad) => (
                    <AdCard key={ad._id} ad={ad} />
                ))}
            </div>
        </div>
    </>
}  