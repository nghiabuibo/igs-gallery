import { useEffect, useState, useRef } from "react"
import socket from "../utils/Socket"

import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";

import VideoPreview from "../components/VideoPreview";

import styles from "./Gallery.module.css"

import heartIcon from "../assets/svg/heart-icon.svg"
import heartFilledIcon from "../assets/svg/heart-icon-filled.svg"
import signOutIcon from "../assets/svg/arrow-right-from-bracket.svg"
import searchIcon from "../assets/svg/magnifying-glass.svg"
import clearIcon from "../assets/svg/xmark.svg"

import vnToEn from "../utils/VnToEn";
import { useSearchParams } from "react-router-dom";

function Gallery(props) {
    const { isFinal } = props
    const [credential, setCredential] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [submissions, setSubmissions] = useState([])
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)

    const [params] = useSearchParams()

    const searchWrapperRef = useRef(null)
    const searchInputRef = useRef(null)

    useEffect(() => {
        socket.io.opts.query = {}
        socket.connect()

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        socket.io.opts.query.isFinal = !isFinal ? 0 : 1
        socket.disconnect().connect()
    }, [isFinal])

    useEffect(() => {
        const handleSearchFocus = (e) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
                setSearchFocus(false)
                return
            }
            setSearchFocus(true)
            searchInputRef.current?.focus()
        }

        window.addEventListener('click', handleSearchFocus)

        return () => {
            window.removeEventListener('click', handleSearchFocus)
        }
    }, [])

    useEffect(() => {
        const code = params.get('code')
        if (code) setSearch(code)
    }, [params])

    useEffect(() => {
        const credentialLocal = localStorage.getItem('igtCredential')
        if (credentialLocal) setCredential(credentialLocal)
    }, [])

    useEffect(() => {
        if (!credential) return

        socket.io.opts.query.credential = credential
        socket.disconnect().connect()
        socket.emit('submission:auth')
    }, [credential])

    useEffect(() => {
        socket.on('submission:load', (initSubmissions) => {
            setSubmissions(initSubmissions)
        })

        socket.on('submission:authed', (payload) => {
            if (!payload?.email) return
            setUserEmail(payload.email)
        })

        socket.on('submission:voted', (data) => {
            const { data: updateSubmission } = data

            setSubmissions(prevSubmissions => {
                const updateSubmissions = [...prevSubmissions]
                updateSubmissions.some(submission => {
                    if (submission.code !== updateSubmission.code) return false

                    submission.votes = updateSubmission.votes
                    submission.finalRoundVotes = updateSubmission.finalRoundVotes
                    return true
                })
                return updateSubmissions
            })
        })

        socket.on('socket:error', (message) => {
            if (message.includes('Token used too late')) {
                handleSignOut()
                return
            }

            toast.error(message, { theme: 'colored' })
        })

        socket.on('socket:warn', (message) => {
            toast.warn(message, { theme: 'colored' })
        })

        socket.on('connect_error', (err) => {
            toast.error(err.message, { theme: 'colored' })
        })

        return () => {
            socket.off('submission:load')
            socket.off('submission:authed')
            socket.off('submission:voted')
            socket.off('socket:error')
            socket.off('socket:warn')
            socket.off('connect_error')
        }
    }, [])

    const handleAuthSuccess = (response) => {
        if (!response?.credential) return

        localStorage.setItem('igtCredential', response.credential)
        setCredential(response.credential)
    }

    const handleAuthError = (err) => {
        console.log(err)
        toast.error(err.message, { theme: 'colored' })
    }

    const handleSignOut = () => {
        setCredential('')
        setUserEmail('')
        localStorage.removeItem('igtCredential')
    }

    const handleVote = (code) => {
        const voteEvent = !isFinal ? 'submission:vote' : 'submission:voteFinal'
        socket.emit(voteEvent, code)
    }

    const handleCopyUrl = (code) => {
        const voteUrl = !isFinal ? 'vote' : 'finalround'
        navigator.clipboard.writeText(`${process.env.REACT_APP_APP_URL}/${voteUrl}?code=${code}`)
        toast.success('URL copied!', { theme: 'colored' })
    }

    const renderFilters = ['all', 'kids', 'junior', 'senior'].map(filterValue => {
        return (
            <button key={filterValue} className={`text-capitalize ${styles.filterBtn} ${styles[filterValue]} ${filter === filterValue ? styles.selected : ''}`} onClick={() => setFilter(filterValue)}>{filterValue}</button>
        )
    })

    const renderSubmissions = submissions.map(submission => {
        if (!submission.users || !submission.users.length) return false

        // get users highest grade
        const usersMap = submission.users?.map(user => {
            const gradeStr = user.grade.replace('N/A', '-1').replace('Khối K', '0').replace('Khối ', '')
            return {
                name: user.name,
                school: user.school,
                gradeInt: parseInt(gradeStr)
            }
        })
        const [highestUser] = usersMap.sort((a, b) => b.gradeInt - a.gradeInt)

        const voteIcon = !isFinal 
        ? submission.votes?.includes(userEmail) ? heartFilledIcon : heartIcon
        : submission.finalRoundVotes?.includes(userEmail) ? heartFilledIcon : heartIcon

        let division
        switch (highestUser.gradeInt) {
            case 0:
            case 1:
            case 2:
                division = 'kids'
                break;

            case 3:
            case 4:
            case 5:
                division = 'junior'
                break;

            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                division = 'senior'
                break;

            default:
                division = 'na'
        }

        if (filter !== 'all' && filter !== division) return false
        if (search !== '') {
            if (
                !submission.users.some(user => {
                    return vnToEn(user.name).toLowerCase().includes(vnToEn(search).toLowerCase())
                        || vnToEn(user.email).toLowerCase().includes(vnToEn(search).toLowerCase())
                })
                && submission.code.toLowerCase() !== search.toLowerCase()
            ) return false
        }

        return (
            <div key={submission.code} className={`col-xl-${!isFinal ? '4' : '6'} col-lg-6 mb-3`}>
                <div className={`${styles.videoWrapper} ${styles[division]}`}>
                    <VideoPreview src={submission.video?.url} />
                </div>

                <div className={`d-flex align-items-center gap-3 ${styles.voteWrapper}`}>
                    {
                        userEmail
                            ?
                            <img src={voteIcon} role="button" className={styles.voteIcon} alt="Vote" onClick={() => handleVote(submission.code)} />
                            :
                            <GoogleLogin onSuccess={handleAuthSuccess} onError={handleAuthError} type='icon' shape='pill' />
                    }

                    <div className={`d-flex align-items-center justify-content-center ${styles.voteCount} ${styles[division]}`}>
                        {(!isFinal ? submission.votes?.length : submission.finalRoundVotes?.length) ?? 0}
                    </div>

                    <div role="button" onClick={() => handleCopyUrl(submission.code)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#fff" height="25"><path d="M591.5 256c50-50 50-131 0-181s-131-50-181 0L387.9 97.6c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l22.6-22.6c37.5-37.5 98.3-37.5 135.8 0s37.5 98.3 0 135.8L444.3 357.9c-37.4 37.4-98.1 37.4-135.6 0c-35.6-35.6-37.6-92.6-4.7-130.6l5.3-6.1c5.8-6.7 5.1-16.8-1.6-22.6s-16.8-5.1-22.6 1.6l-5.3 6.1c-43.9 50.7-41.2 126.7 6.2 174.1c49.9 49.9 130.9 49.9 180.8 0L591.5 256zM48.5 256c-50 50-50 131 0 181s131 50 181 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-22.6 22.6c-37.5 37.5-98.3 37.5-135.8 0s-37.5-98.3 0-135.8L195.7 154.1c37.4-37.4 98.1-37.4 135.6 0c35.6 35.6 37.6 92.6 4.7 130.6l-5.3 6.1c-5.8 6.7-5.1 16.8 1.6 22.6s16.8 5.1 22.6-1.6l5.3-6.1c43.9-50.7 41.2-126.7-6.2-174.1C303.9 81.5 223 81.5 173 131.4L48.5 256z" /></svg>
                    </div>

                    <div className={`ms-auto text-end`}>
                        {
                            userEmail
                                ?
                                <img src={signOutIcon} role="button" alt="Sign out" className={`${styles.voteIcon}`} onClick={handleSignOut} />
                                :
                                <small className={styles.signInText}>Sign in to vote</small>
                        }
                    </div>
                </div>

                <div className={`${styles.submissionInfo} ${styles[division]}`}>
                    <div className={styles.submissionInfoField}>Name: {highestUser.name}</div>
                    <div className={styles.submissionInfoField}>Division: <span className="text-capitalize">{division}</span></div>
                    <div className={styles.submissionInfoField}>School: {highestUser.school}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="row py-5 mb-5 g-0">
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-3">
                {renderFilters}
                <div className={styles.searchWrapper} ref={searchWrapperRef}>
                    <input ref={searchInputRef} type="text" className={`${styles.search} ${searchFocus ? styles.focus : ''}`} value={search} onInput={(e) => setSearch(e.target.value)} />
                    <img role="button" alt="Search" src={!search ? searchIcon : clearIcon} className={styles.searchIcon} onClick={() => setSearch('')} />
                </div>
            </div>
            {renderSubmissions}
        </div>
    )
}

export default Gallery