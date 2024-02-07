import axios from 'axios'
import handleRequestError from '../utils/HandleRequestError';
import { useState } from 'react';
import Logo from '../sections/Logo';
import Intro from '../sections/Intro';
import Features from '../sections/Features';
import Timeline from '../sections/Timeline';
import Prizes from '../sections/Prizes';
import Outro from '../sections/Outro';

import EntryModel from '../utils/EntryModel.js';

import styles from './Home.module.css';
import { toast } from 'react-toastify';

function Home() {
    const [data, setData] = useState({
        entries: [new EntryModel()],
        currentEntryIndex: 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const endpoint = '/submissions/register'
        const apiUrl = process.env.REACT_APP_API_URL + endpoint
        const res = await axios.post(apiUrl, data.entries).catch(handleRequestError)

        if (!res) return
        if (res.status < 200 && res.status >= 300) return

        const message = res?.data?.message ?? 'Đăng ký thành công! Vui lòng kiểm tra email đã đăng ký để nhận mã dự thi.'
        toast.success(message, { theme: 'colored' })
    }

    return (
        <div className={`container ${styles.home}`}>
            <Logo />
            <Intro data={data} setData={setData} handleSubmit={handleSubmit} />
            <Features />
            <Timeline />
            <Prizes />
            <Outro data={data} setData={setData} handleSubmit={handleSubmit} />
        </div>
    );
}

export default Home;
