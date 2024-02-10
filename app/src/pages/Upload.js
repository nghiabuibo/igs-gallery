import Logo from "../sections/Logo"

import UploadForm from "../components/UploadForm"
import Title from "../components/Title"

import stylesHome from './Home.module.css'
import styles from './Upload.module.css'

import checkSvg from '../assets/svg/check.svg'
import imgProjectGallery from "../assets/svg/project-gallery.svg"
import unlockTheFutureSvg from "../assets/svg/unlock-the-future.svg"

import { useState } from "react"

function UploadInfo(props) {
    const { setIsUploadSucceeded } = props

    return (
        <>
            <div className="text-center mt-5 mb-4">
                <Title title="PROJECT" />
            </div>
            <UploadForm setIsUploadSucceeded={setIsUploadSucceeded} />
        </>
    )
}

function UploadSucceeded() {
    return (
        <div className={`row text-center`}>
            <img src={checkSvg} className={styles.checkSvg} alt="Check" />

            <p className="fs-5"><strong>Thank you for submitting your project to the IGS Project Gallery.</strong></p>
            <p className="fs-5">Kindly check your email and the Zalo group regularly to stay updated with the most recent announcements provided by the organizers.</p>
        </div>
    )
}

function Upload() {
    const [isUploadSucceeded, setIsUploadSucceeded] = useState(false)

    return (
        <div className={`container ${stylesHome.home}`}>
            <Logo />
            <div className="row mt-5">
                <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    {
                        isUploadSucceeded &&
                        <UploadSucceeded />
                    }

                    {
                        !isUploadSucceeded &&
                        <UploadInfo setIsUploadSucceeded={setIsUploadSucceeded} />
                    }
                </div>
            </div>
            <div className={styles.footerArea}>
                <div className={styles.footerAreaText}>
                    <img src={imgProjectGallery} className={styles.imgProjectGallery} alt="IGS Project Galery" />
                    <img src={unlockTheFutureSvg} className={styles.unlockTheFutureSvg} alt="Unlock The Future" />
                </div>
            </div>
        </div>
    )
}

export default Upload