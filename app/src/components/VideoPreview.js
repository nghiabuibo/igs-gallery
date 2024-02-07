import { useMemo } from "react"
import defaultImg from "../assets/image/default-video-img.jpg"
import noImg from "../assets/image/no-video-img.jpg"
import styles from "./VideoPreview.module.css"

function VideoPreview(props) {
    const { file, src, poster } = props

    const srcPreview = useMemo(() => {
        return file ? URL.createObjectURL(file) : src ?? ''
    }, [file, src])

    return (
        <video
            src={srcPreview.includes('http') ? srcPreview : process.env.REACT_APP_CMS_URL + srcPreview}
            controls={true}
            preload="none"
            poster={poster ?? srcPreview ? defaultImg : noImg}
            className={`w-100 ${styles.video}`}
        />
    )
}

export default VideoPreview