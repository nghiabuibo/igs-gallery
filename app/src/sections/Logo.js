import styles from "./Logo.module.css"
import logoImg from '../assets/image/igs-logo.png'
import igtLogoImg from '../assets/image/igt-logo.png'

function Logo(props) {
    const { igtLogo } = props

    return (
        <div className='row py-5'>
            <div className="col-lg-6 offset-lg-3">
                <div className="row align-items-center g-0">
                    <div className="col">
                        <a href={`/`} className={`px-3 ${styles.logo}`}>
                            <img src={logoImg} className={`img-fluid`} alt="IGS Logo" />
                        </a>
                    </div>
                    {
                        igtLogo &&
                        <div className="col">
                            <a href={`/`} className={`px-3 ${styles.logo}`}>
                                <img src={igtLogoImg} className={`img-fluid ${styles.igtLogoImg}`} alt="IGT Logo" />
                            </a>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Logo