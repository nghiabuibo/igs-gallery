import axios from "axios"
import handleRequestError from "../utils/HandleRequestError"
import Box from "../components/Box"
import { useEffect, useState } from "react"
import styles from "./VoteNotification.module.css"

function VoteNotification() {
    const [isShowNotification, setIsShowNotification] = useState(false)
    const [description, setDescription] = useState('Cổng bình chọn đang được mở.')
    const [cta, setCTA] = useState('Tham gia bình chọn')

    useEffect(() => {
        if (window.location.pathname === '/vote') return

        const checkVoteNotification = async () => {
            const endpoint = '/vote-setting'
            const apiUrl = process.env.REACT_APP_API_URL + endpoint
            const res = await axios.get(apiUrl).catch(handleRequestError)
            const voteSettings = res?.data?.data?.attributes

            if (!voteSettings) return
            if (!voteSettings.showNotification) return

            const currentTimestamp = Date.now()
            const startTimestamp = new Date(voteSettings.startTime).getTime()
            const endTimestamp = new Date(voteSettings.endTime).getTime()

            if (currentTimestamp < startTimestamp) return
            if (endTimestamp && currentTimestamp > endTimestamp) return

            if (voteSettings.description) setDescription(voteSettings.description)
            if (voteSettings.cta) setCTA(voteSettings.cta)

            setIsShowNotification(true)
        }
        checkVoteNotification()
    }, [])

    return (
        isShowNotification &&

        <div className={`text-center ${styles.voteNotificationWrapper}`}>
            <Box shape="square" size="small">
                {description}
                <a href="/vote" className="btn btn-light btn-sm fw-bold ms-3">{cta}</a>
            </Box>
        </div>
    )
}

export default VoteNotification