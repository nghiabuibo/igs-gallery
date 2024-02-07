import styles from "./Title.module.css"

function Title(props) {
    const { title, variant, size } = props
    return (
        <h2 className={`py-2 px-4 mb-0 text-center d-inline-block fw-bold ${styles.title} ${size? styles[size] : styles.md} ${variant? styles[variant] : styles.dark}`}>{title}</h2>
    )
}

export default Title