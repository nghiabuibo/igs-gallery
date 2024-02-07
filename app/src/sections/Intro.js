import RegisterForm from "../components/RegisterForm"
import imgLeft from "../assets/image/intro-left.png"

function Intro(props) {
    return (
        <div className="row mb-5 align-items-center">
            <div className="col-lg-7">
                <img src={imgLeft} className="img-fluid user-select-none pe-none" alt="Intro" />
            </div>
            <div className="col-lg-5">
                <RegisterForm {...props} />
            </div>
        </div>
    )
}

export default Intro