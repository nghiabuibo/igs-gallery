import RegisterForm from "../components/RegisterForm"
import imgProjectGallery from "../assets/svg/project-gallery.svg"

import styles from './Intro.module.css'

function Intro(props) {
    return (
        <div className="row align-items-center">
            <div className="col-lg-12">
                <img src={imgProjectGallery} className={styles.imgProjectGallery} alt="IGS Project Galery" />
            </div>
            <div className="col-lg-6 offset-lg-3">
                <RegisterForm {...props} />
            </div>
        </div>
    )
}

export default Intro