import axios from "axios";
import { useAuth } from '../../contexts/auth'
import { FcLike, FcDislike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

export default function LikeUnlike({ ad }) {

    //context
    const [auth, setAuth] = useAuth()

    //hooks
    const navigate = useNavigate()

    const handleLike = async () => {
        try {
            if (auth.user === null) {
                navigate("/login", {
                    state: `/ad/${ad.slug}` //add state to allow user to back to this page when login back
                })
                return
            }

            const { data } = await axios.post("/wishlist", { adId: ad._id })
            // console.log("Handle likes =>", data)
            setAuth({ ...auth, user: data })

            //use parse when get data from LS
            const fromLS = JSON.parse(localStorage.getItem("auth"))
            fromLS.user = data;

            localStorage.setItem('auth', JSON.stringify(fromLS))
            toast.success("Added to wishlist")

        } catch (err) {
            console.log(err)
        }
    }

    const handleUnlike = async () => {
        try {
            if (auth.user === null) {
                navigate("/login", {
                    state: `/ad/${ad.slug}`
                })
                return
            }

            const { data } = await axios.delete(`/wishlist/${ad._id}`)
            // console.log("Handle unlikes =>", data)
            setAuth({ ...auth, user: data })

            const fromLS = JSON.parse(localStorage.getItem("auth"))
            fromLS.user = data;

            localStorage.setItem('auth', JSON.stringify(fromLS))
            toast.success("Removed from wishlist")


        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {auth.user?.wishlist?.includes(ad?._id) ?
                <span>
                    <FcLike
                        onClick={handleUnlike}
                        className="h2 mt-3 pointer" />
                </span> :
                <span>
                    <FcLikePlaceholder
                        onClick={handleLike}
                        className="h2 mt-3 pointer" />
                </span>}
        </>
    )
}


