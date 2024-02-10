import stylesHome from "../pages/Home.module.css"
import stylesTimeline from '../sections/Timeline.module.css'

import Logo from "../sections/Logo"

import Gallery from "../sections/Gallery"
import Box from "../components/Box"

function Intro() {
    return (
        <div className="row mb-5 pb-5 align-items-center">
            <div className={`col-md-8 offset-md-2`}>
                <Box>
                    <ul className={`mb-0 ${stylesTimeline.unStyle} ${stylesTimeline.customBullet} ${stylesTimeline.timelineList}`}>
                        <li>
                            Scoring and voting deadline: <strong>At 11:59 PM on 18th February 2024.</strong>
                        </li>
                        <li>
                            Regarding the voting mechanism:<br />
                            <strong>One account can vote for multiple performances simultaneously but each performance can only be voted once.</strong>
                        </li>
                        <li>
                            All votes that involve <strong>virtual interferences, inaccurate information</strong>, or violate any of the mentioned regulations may be refused by The Organizing Committee, leading to disqualification of the submitted act or revocation of prizes.
                        </li>
                    </ul>
                </Box>
            </div>
        </div>
    )
}

function Vote(props) {
    const { isFinal } = props
    return (
        <div className={`container ${stylesHome.home}`}>
            <Logo igLogo={true} />
            <Intro />
            <Gallery isFinal={isFinal} />
        </div>
    )
}

export default Vote