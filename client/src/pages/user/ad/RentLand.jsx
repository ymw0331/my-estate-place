import Sidebar from "../../../components/nav/Sidebar"
import { AdForm } from "../../../components/forms/AdForm"


const RentLand = () => {
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Rent Land</h1>
            <Sidebar />
            <div className="conatiner mt-2">
                <AdForm action="Rent" type="Land" />
            </div>
        </div>
    )
}

export default RentLand