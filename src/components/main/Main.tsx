import { Chart } from "../common/Chart/Chart"
import { Desk } from "../common/Desk/Desk"
import "./Main.scss"

export const Main = () => {
    return (
        <div className="main_container">
            <Desk />
            <Chart />
        </div>
    )
}