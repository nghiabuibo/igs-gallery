import RegisterForm from "../components/RegisterForm"
import outroImg from "../assets/image/outro-right.png"

function Outro(props) {
    return (
        <div className="row align-items-end">
            <div className="col-lg-5 mb-lg-5 pb-lg-5">
                <RegisterForm {...props} />
            </div>
            <div className="col-lg-7">
                <img src={outroImg} className="img-fluid user-select-none pe-none" alt="Outro" />
            </div>
        </div>
    )
}

export default Outro