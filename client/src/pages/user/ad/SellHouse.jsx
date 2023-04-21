import Sidebar from "../../../components/nav/Sidebar"
import { AdForm } from "../../../components/forms/AdForm"


const SellHouse = () => {
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Sell House</h1>
            <Sidebar />
            <div className="conatiner mt-2">
                <AdForm action="Sell" type="House" />
            </div>
        </div>
    )
}

export default SellHouse