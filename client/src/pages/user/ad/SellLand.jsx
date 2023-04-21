import Sidebar from "../../../components/nav/Sidebar"
import { AdForm } from "../../../components/forms/AdForm"


const SellLand = () => {
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Sell Land</h1>
            <Sidebar />
            <div className="conatiner mt-2">
                <AdForm action="Sell" type="Land" />
            </div>
        </div>
    )
}

export default SellLand