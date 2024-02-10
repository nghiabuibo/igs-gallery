import { useEffect, useState } from "react"
import axios from "axios"
import handleRequestError from "../utils/HandleRequestError"

import styles from "./RegisterForm.module.css"

import continueSvg from "../assets/svg/continue.svg"
import unlockTheFutureSvg from "../assets/svg/unlock-the-future.svg"

function Input(props) {
    const { type, name, label, value, required, onChange } = props
    return (
        <div className={`row mb-2 align-items-center ${styles.wrapper}`}>
            <div className={`col-12`}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                    className={`px-3 py-2 text-white ${styles.input}`}
                    placeholder={label}
                />
            </div>
        </div>
    )
}

function Select(props) {
    const { options: grades, label, name, value, required, onChange } = props
    const renderGradeOptions = grades.map((grade, index) => {
        return (
            <option key={index} value={grade}>{grade}</option>
        )
    })
    return (
        <div className={`row mb-2 align-items-center ${styles.wrapper}`}>
            <div className={`col-12`}>
                <select name={name} value={value} required={required} onChange={onChange} className={`px-3 py-2 text-white ${styles.input}`}>
                    <option value="">{label}</option>
                    {renderGradeOptions}
                </select>
            </div>
        </div>
    )
}

function RegisterForm(props) {
    const { data, setData, handleSubmit } = props
    const [grades, setGrades] = useState([])

    const currentEntry = data.entries[data.currentEntryIndex] ?? {}

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        const dataUpdated = { ...data }
        dataUpdated.entries[dataUpdated.currentEntryIndex][name] = value
        setData(dataUpdated)
    }

    const handleEntryChange = (index) => {
        setData(prevState => ({
            ...prevState,
            currentEntryIndex: index
        }))
    }

    const handleEntryDelete = (index) => {
        const dataUpdated = { ...data }
        dataUpdated.entries.splice(index, 1)
        if (dataUpdated.currentEntryIndex >= dataUpdated.entries.length) {
            dataUpdated.currentEntryIndex = dataUpdated.entries.length - 1
        }
        setData(dataUpdated)
    }

    const renderEntryNav = data.entries.map((_, index) => {
        return (
            <div key={index} className="col-6 col-sm-4 mb-1 g-1">
                <button className={`d-flex justify-content-between w-100 p-0 text-white text-nowrap ${styles.wrapper} ${data.currentEntryIndex === index ? styles.selected : ''}`}>
                    <small className="px-2 py-1 flex-grow-1 text-center" onClick={() => handleEntryChange(index)}>Thành viên {index + 1}</small>
                    <span className={`d-flex justify-content-center align-items-center p-2 flex-shrink-0 ${styles.entryDelete}`} onClick={() => handleEntryDelete(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="#fff">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </span>
                </button>
            </div>

        )
    })

    useEffect(() => {
        const getGrades = async () => {
            const endpoint = '/user/grades'
            const apiUrl = process.env.REACT_APP_API_URL + endpoint
            const res = await axios.get(apiUrl).catch(handleRequestError)
            if (res?.data?.grades) setGrades(res.data.grades)
        }
        getGrades()
    }, [])

    return (
        <>
            {
                data.entries.length > 1 &&
                <div className={`row mb-2 ${styles.memberNav}`}>
                    {renderEntryNav}
                </div>
            }
            <form onSubmit={handleSubmit} className={styles.register}>
                <Input type="text" name="name" label="Full name" value={currentEntry.name} required={true} onChange={handleInputChange} />
                <Input type="email" name="email" label="Email address" value={currentEntry.email} required={true} onChange={handleInputChange} />
                <div className="row g-2">
                    <div className="col-lg-7">
                        <Select name="grade" label="Grade" value={currentEntry.grade} options={grades} required={true} onChange={handleInputChange} />
                    </div>
                    <div className="col-lg-5 mt-0 mt-lg-2">
                        <Input type="text" name="class" label="Class" value={currentEntry.class} required={true} onChange={handleInputChange} />
                    </div>
                </div>

                <div className={styles.submitArea}>
                    <div className={styles.submitAreaText}>
                        <button className={`${styles.submitBtn}`} type="submit">
                            <img src={continueSvg} className={styles.continueSvg} alt="Continue" />
                        </button>
                        <img src={unlockTheFutureSvg} className={styles.unlockTheFutureSvg} alt="Unlock The Future" />
                        <em>
                            <strong>* Registration deadline:</strong>
                            <br />
                            At 11:59 PM on 7th February, 2024
                        </em>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterForm