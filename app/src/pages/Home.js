import axios from 'axios'
import handleRequestError from '../utils/HandleRequestError';
import { useEffect, useState } from 'react';
import Logo from '../sections/Logo';
import Intro from '../sections/Intro';

import EntryModel from '../utils/EntryModel.js';

import styles from './Home.module.css';

function Home() {
    const [data, setData] = useState({
        entries: [new EntryModel()],
        currentEntryIndex: 0
    })

    useEffect(() => {
        window.location.href = `${process.env.REACT_APP_APP_URL}/vote`
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const endpoint = '/submissions/register'
        const apiUrl = process.env.REACT_APP_API_URL + endpoint
        const res = await axios.post(apiUrl, data.entries).catch(handleRequestError)

        if (!res) return
        if (res.status < 200 && res.status >= 300) return
        
        // const message = res?.data?.message ?? 'Đăng ký thành công!'
        // toast.success(message, { theme: 'colored' })
        if (!res?.data?.code) return
        window.location.href = `${process.env.REACT_APP_APP_URL}/upload/${res.data.code}`
    }

    return (
        <div className={`container ${styles.home}`}>
            <Logo />
            <Intro data={data} setData={setData} handleSubmit={handleSubmit} />
        </div>
    );
}

export default Home;
