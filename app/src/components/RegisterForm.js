import { useEffect, useState } from "react"
import axios from "axios"
import handleRequestError from "../utils/HandleRequestError"

import EntryModel from "../utils/EntryModel"

import styles from "./RegisterForm.module.css"

function Input(props) {
    const { type, name, label, value, required, onChange } = props
    return (
        <div className={`row mb-2 align-items-center ${styles.wrapper}`}>
            <div className={`col-6`}>
                <div className={`p-1 overflow-hidden text-truncate ${styles.label}`}>{label}</div>
            </div>
            <div className={`col-6 g-0`}>
                <input type={type} name={name} value={value} required={required} onChange={onChange} className={`px-3 py-2 text-white ${styles.input}`} />
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
            <div className={`col-6`}>
                <div className={`p-1 overflow-hidden text-nowrap text-truncate ${styles.label}`}>{label}</div>
            </div>
            <div className={`col-6 g-0`}>
                <select name={name} value={value} required={required} onChange={onChange} className={`px-3 py-2 text-white ${styles.input}`}>
                    <option value=""></option>
                    {renderGradeOptions}
                </select>
            </div>

        </div>

    )
}

function CheckButton(props) {
    const { name, checked, optionLabel, optionValue, onChange } = props
    return (
        <button type="button" className={`w-100 px-3 py-2 flex-shrink-1 text-white ${styles.wrapper} ${checked === optionValue ? styles.selected : ''}`} name={name} checked={optionValue} onClick={onChange}>{optionLabel}</button>
    )
}

function CheckboxSelect(props) {
    const { label, options } = props
    const renderOption = options.map((option, index) => {
        return (
            <CheckButton {...props} key={index} optionLabel={option.optionLabel} optionValue={option.optionValue} />
        )
    })
    return (
        <div className="row flex-nowrap gap-2 mb-2">
            <div className={`px-3 py-2 flex-shrink-1 ${styles.wrapper} ${styles.label}`}>{label}</div>
            {renderOption}
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

    const handleCheckboxChange = (e) => {
        const name = e.target.name
        const value = e.target.checked
        const dataUpdated = { ...data }
        dataUpdated.entries[dataUpdated.currentEntryIndex][name] = value
        setData(dataUpdated)
    }

    const handleEntryAdd = () => {
        const maxEntry = 9
        if (data.entries.length >= maxEntry) return

        const entryModel = new EntryModel()
        const dataUpdated = { ...data }
        dataUpdated.entries.push(entryModel)
        dataUpdated.currentEntryIndex = dataUpdated.entries.length - 1
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
                <Input type="text" name="name" label="Họ và tên học sinh:" value={currentEntry.name} required={true} onChange={handleInputChange} />
                <Input type="tel" name="phone" label="SĐT liên hệ:" value={currentEntry.phone} required={true} onChange={handleInputChange} />
                <Input type="email" name="email" label="Email:" value={currentEntry.email} required={true} onChange={handleInputChange} />
                <Input type="text" name="address" label="Địa chỉ liên hệ:" value={currentEntry.address} required={true} onChange={handleInputChange} />
                <Input type="date" name="birthday" label="Năm sinh:" value={currentEntry.birthday} required={true} onChange={handleInputChange} />
                <Input type="text" name="school" label="Trường:" value={currentEntry.school} required={true} onChange={handleInputChange} />
                <Select name="grade" label="Khối lớp:" value={currentEntry.grade} options={grades} required={true} onChange={handleInputChange} />
                <CheckboxSelect
                    name="igsStudent"
                    label="Học sinh IGS:"
                    checked={currentEntry.igsStudent}
                    onChange={handleCheckboxChange}
                    options={[
                        {
                            optionLabel: 'Có',
                            optionValue: true
                        },
                        {
                            optionLabel: 'Không',
                            optionValue: false
                        }
                    ]}
                />
                <div className="row mb-4">
                    <button type="button" className={`px-3 py-2 text-white ${styles.addEntry} ${styles.wrapper}`} onClick={handleEntryAdd}>{data.entries?.length > 1 ? 'Thêm thành viên' : 'Đăng ký nhóm'}</button>
                </div>
                <div className="text-center mb-2">
                    <button className={`fs-4 fw-bold py-2 px-5 ${styles.wrapper} ${styles.submitBtn}`} type="submit">ĐĂNG KÝ NGAY</button>
                </div>
                <div className="text-center">
                    <a href={`/upload`} className="text-white">Bạn đã đăng ký? Nộp bài thi tại đây.</a>
                </div>
            </form>
        </>
    )
}

export default RegisterForm