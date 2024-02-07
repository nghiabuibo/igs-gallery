import styles from "./Loading.module.css"
import axios from 'axios';

import { useState } from "react";

function Loading() {
    const [isLoading, setIsLoading] = useState(false)

    // Add a request interceptor
    axios.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            if (!config.url.includes('/upload/submission')) {
                setIsLoading(true)
            }
            return config;
        },
        function (error) {
            // Do something with request error
            setIsLoading(false)
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        function (response) {
            // Do something with the response data
            setIsLoading(false)
            return response;
        },
        function (error) {
            // Do something with response error
            setIsLoading(false)
            return Promise.reject(error);
        }
    );

    return (
        <>
            {
                isLoading &&
                <div className={styles.backdrop}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Loading