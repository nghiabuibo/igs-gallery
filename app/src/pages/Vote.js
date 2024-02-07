import stylesHome from "../pages/Home.module.css"
import stylesTimeline from '../sections/Timeline.module.css'
import styles from "./Vote.module.css"

import Logo from "../sections/Logo"

import round2Img from "../assets/image/vote-round-2.png"
import roundFinalImg from "../assets/image/final-text.png"
import voteIntroImg from "../assets/image/vote-intro.png"
import voteIntroFinalImg from "../assets/image/upload-bottom.png"

import Gallery from "../sections/Gallery"
import Box from "../components/Box"

// import emailIcon from "../assets/svg/email-icon.svg"
import phoneIcon from "../assets/svg/phone-icon.svg"
import igtLogo from "../assets/image/igt-logo.png"

function RoundName(props) {
    const { isFinal } = props
    return (
        <div className={`row mb-5 ${styles.roundNameWrapper}`}>
            <div className="col-lg-10 offset-lg-1">
                <img src={!isFinal ? round2Img : roundFinalImg} alt="Round Name" className="img-fluid user-select-none pe-none" />
            </div>
        </div>
    )
}

function Intro(props) {
    const { isFinal } = props
    return (
        <div className="row mb-5 pb-5 align-items-center">
            <div className={`col-md-${!isFinal ? '4' : '6'}`}>
                <img src={!isFinal ? voteIntroImg: voteIntroFinalImg} alt="Voting Intro" className="img-fluid user-select-none pe-none" />
            </div>
            <div className={`col-md-${!isFinal ? '8' : '6'}`}>
                <Box>
                    {
                        !isFinal &&
                        <ul className={`mb-0 ${stylesTimeline.unStyle} ${stylesTimeline.customBullet} ${stylesTimeline.timelineList}`}>
                            <li>
                                Scoring and voting deadline:<br />
                                <strong>At 11:59 PM on 10th December 2023.</strong>
                            </li>
                            <li>
                                Regarding the voting mechanism:<br />
                                <strong>One account can vote for multiple performances simultaneously but each performance can only be voted once.</strong>
                            </li>
                            <li>All votes that involve virtual interferences, inaccurate information, or violate any of the mentioned regulations may be refused by The Organizing Committee, leading to disqualification of the submitted act or revocation of prizes.</li>
                        </ul>
                    }

                    {
                        isFinal &&
                        <ul className={`mb-0 ${stylesTimeline.unStyle} ${stylesTimeline.customBullet} ${stylesTimeline.timelineList}`}>
                            <li>
                                Regarding the voting mechanism:<br />
                                <strong>One account can vote for multiple performances simultaneously but each performance can only be voted once.</strong>
                                <br/>
                                <br/>
                                <em>Mỗi tài khoản chỉ được bình chọn 01 lần cho mỗi tiết mục. Một tài khoản có thể bình chọn cùng lúc nhiều tiết mục.</em>
                                <br/>
                                <br/>
                            </li>
                            <li>
                                <strong>All votes that involve virtual interferences, inaccurate information, or violate any of the mentioned regulations may be refused by The Organizing Committee, leading to disqualification of the submitted act or revocation of prizes.</strong>
                                <br/>
                                <br/>
                                <em>Tất cả những lượt bình chọn có can thiệp của tương tác ảo, thông tin không chính xác, BTC có quyền từ chối bài dự thi, từ chối trao giải hoặc thu hồi giải thưởng nếu phát hiện bài dự thi vi phạm một trong những quy định kể trên.</em>
                            </li>
                        </ul>
                    }
                </Box>
            </div>
        </div>
    )
}

function Outro() {
    return (
        <div className="row pb-5">
            {/* <p>Ivy Global School là trường Quốc tế Mỹ trực tuyến, được thành lập tại Florida, USA.</p>
            <p>Các nội dung giảng dạy tại <strong>Ivy Global School</strong> được cung cấp bởi các tổ chức giáo dục, trường học uy tín tại Mỹ, theo chuẩn Common Core State Standards của Bộ Giáo Dục Mỹ, và được kiểm định bởi Cognia - Tổ chức kiểm định chất lượng lớn nhất tại Mỹ.</p>
            <p className="d-flex align-items-center gap-3">
                <img src={emailIcon} className={styles.outroIcon} alt="Email" />
                <a href="mailto:info@ivyglobalschool.org" className="text-white">info@ivyglobalschool.org</a>
            </p> */}
            <p className="d-flex align-items-center justify-content-center gap-3">
                <img src={phoneIcon} className={styles.outroIcon} alt="Phone" />
                <span>
                    Northern Region: <a href="tel:0898083111" className="text-white">0898 083 111</a>
                    <br />
                    Southern Region: <a href="tel:0906924592" className="text-white">0906 924 592</a>
                </span>
            </p>
            <div className="text-center">
                <img src={igtLogo} className={`img-fluid user-select-none pe-none ${styles.outroLogo}`} alt="IGT Logo" />
            </div>
        </div>
    )
}

function Vote(props) {
    const { isFinal } = props
    return (
        <div className={`container ${stylesHome.home}`}>
            <Logo igtLogo={true} />
            <RoundName isFinal={isFinal} />
            <Intro isFinal={isFinal} />
            <Gallery isFinal={isFinal} />
            <Outro />
        </div>
    )
}

export default Vote