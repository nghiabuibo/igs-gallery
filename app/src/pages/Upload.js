import Logo from "../sections/Logo"

import UploadForm from "../components/UploadForm"
import Box from "../components/Box"
import Title from "../components/Title"

import stylesHome from './Home.module.css'
import stylesTimeline from '../sections/Timeline.module.css'
import styles from "./Upload.module.css"

import uploadTopImg from '../assets/image/upload-top.png'
import uploadBottomImg from '../assets/image/upload-bottom.png'

import { useState } from "react"

function UploadInfo(props) {
    const { setIsUploadSucceeded } = props

    const [isFee, setIsFee] = useState(false)

    return (
        <>
            {
                isFee &&
                <Box title="Participant fee:">
                    <ul className={`${stylesTimeline.unStyle} ${stylesTimeline.customBullet} ${stylesTimeline.timelineList}`}>
                        <li>The competition is <strong>FREE</strong> for Ivy Global School students</li>
                        <li>If the nationwide participants pass the preliminary round, the participation fee for EACH STUDENT is <strong>199.000VND</strong></li>
                        <li>
                            <strong>Beneficiary:</strong><br />
                            CÔNG TY TNHH IVY GLOBAL SCHOOL VIỆT NAM<br />
                            Account number: <strong className={styles.green}>878789898989</strong> (VND)<br />
                            Branch: Military Bank - Transaction Office Branch 1 (MB Bank)<br />
                        </li>
                    </ul>
                </Box>
            }

            <div className="text-center mt-5 mb-4">
                <Title title="PERFORMANCE" />
            </div>
            <UploadForm setIsUploadSucceeded={setIsUploadSucceeded} setIsFee={setIsFee} />
            <img src={uploadTopImg} className="img-fluid user-select-none pe-none" alt="Upload Top" />
        </>
    )
}

function UploadSucceeded() {
    return (
        <div className={`row text-center`}>
            <img src={uploadTopImg} className="img-fluid user-select-none pe-none" alt="Upload Top" />
            <p className="fs-5"><strong>Thank you for participating in our competition.</strong></p>
            <p className="fs-5">The judge panel will mark your performance carefully and the result will be announced soon.</p>
            <img src={uploadBottomImg} className="img-fluid user-select-none pe-none" alt="Upload Bottom" />
        </div>
    )
}

function Upload() {
    const [isUploadSucceeded, setIsUploadSucceeded] = useState(false)

    return (
        <div className={`container ${stylesHome.home}`}>
            <Logo />
            <div className="row">
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
        </div>
    )
}

export default Upload