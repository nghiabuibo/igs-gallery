import { useEffect, useMemo, useState } from "react"
import defaultImg from "../assets/image/default-video-img.jpg"
import noImg from "../assets/image/no-video-img.jpg"
import styles from "./FilePreview.module.css"
import { Document, Page } from 'react-pdf'

function FilePreview(props) {
    const { file, media, poster } = props
    const [numPages, setNumPages] = useState();
    const [isZoomed, setIsZoomed] = useState(false)
    const [documentContainerRef, setDocumentContainerRef] = useState()
    const [documentWidth, setDocumentWidth] = useState()

    const srcPreview = useMemo(() => {
        return file ? URL.createObjectURL(file) : media?.url ?? ''
    }, [file, media?.url])

    const src = srcPreview.includes('http') ? srcPreview : process.env.REACT_APP_CMS_URL + srcPreview
    const fileType = file ? file.type : media?.mime ?? ''

    // Start observing the element when the component is mounted
    useEffect(() => {
        if (!documentContainerRef) return;

        const observer = new ResizeObserver(() => {
            setDocumentWidth(documentContainerRef.offsetWidth - 20)
        });

        observer.observe(documentContainerRef);
        return () => {
            // Cleanup the observer by unobserving all elements
            observer.unobserve(documentContainerRef);
        };
    }, [documentContainerRef])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setDocumentWidth(documentContainerRef.current?.offsetWidth - 20)
        setNumPages(numPages);
    }

    const filePreviewJsx = <>
        {
            fileType.includes('video') &&
            <video
                src={src}
                controls={true}
                preload="none"
                poster={poster ?? srcPreview ? defaultImg : noImg}
                className={`${styles.filePreview}`}
            />
        }

        {
            fileType.includes('audio') &&
            <audio
                src={src}
                controls={true}
                preload="none"
                className={`${styles.filePreview} ${styles.audio}`}
            />
        }

        {
            fileType.includes('image') &&
            <img
                src={src}
                className={`${styles.filePreview}`}
                alt="File Preview"
            />
        }

        {
            (fileType.includes('presentationml') || fileType.includes('ms-powerpoint')) &&
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${src}`}
                className={`${styles.filePreview}`}
                title="File Preview"
            ></iframe>
        }

        {
            fileType.includes('pdf') &&
            <div className={`${styles.filePreview}`} ref={setDocumentContainerRef}>
                <Document file={`${src}`} onLoadSuccess={onDocumentLoadSuccess}                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={documentWidth}
                        />
                    ))}
                </Document>
            </div>
        }
    </>

    const filePlaceholder = <div className={`${styles.filePreview}`}></div>

    return (
        <>
            <div className={`position-relative`}>
                {!isZoomed ? filePreviewJsx : filePlaceholder}
                <div role="button" className={`${styles.zoomBtn}`} onClick={() => setIsZoomed(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M208 48a160 160 0 1 1 0 320 160 160 0 1 1 0-320zm0 368c48.8 0 93.7-16.8 129.1-44.9L471 505c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L371.1 337.1C399.2 301.7 416 256.8 416 208C416 93.1 322.9 0 208 0S0 93.1 0 208S93.1 416 208 416zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" /></svg>
                </div>
            </div>
            {
                isZoomed &&
                <div className={`${styles.zoomWrapper}`}>
                    {filePreviewJsx}
                    <div role="button" className={`${styles.closeZoomBtn}`} onClick={() => setIsZoomed(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#fff"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </div>
                </div>
            }
        </>
    )
}

export default FilePreview