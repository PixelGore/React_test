import './Footer.scss'
import carImg from '../../assets/footer/car.png'

export const Footer = () => {
    return (
        <div className="footer_container">
            <div className="night">
                <h3 className="text">My journey in Web development</h3>
                <div className="surface"></div>
                <div className="car">
                    <img src={carImg} alt="" />
                </div>
            </div>
        </div>

    )
}