import toast from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { useAuth } from "../../contexts/auth"

export default function AccountActivate() {
    //context
    const [auth, setAuth] = useAuth()

    //hooks
    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) requestActivation()
    }, [token])


    const requestActivation = async () => {
        try {
            const { data } = await axios.post(`/register`, { token })

            if (data?.error) {
                toast.error(data.error)
            } else {
                //save in local storage
                localStorage.setItem('auth', JSON.stringify(data))

                //save in context
                setAuth(data)
                toast.success("Succesfully logged in. Welcome to Realist Platform")
                navigate("/")
            }


        } catch (err) {
            console.log(err)
            toast.error("Something went wrong. Try again")
        }

    }

    return (
        <>
            <div className="display-1 d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '-5%' }}>
                Please Wait...
            </div>
        </>
    )
}  