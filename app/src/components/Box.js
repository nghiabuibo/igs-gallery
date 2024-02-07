import styles from "./Box.module.css"
import Title from "./Title"

function Box(props) {
    const { title, children, shape, size } = props

    return (
        <div className={`${styles.box} ${styles[shape]} ${styles[size]}`}>
            {
                title &&
                <div className="text-center mb-3">
                    <Title title={title} />
                </div>
            }
            {children}
        </div>
    )
}

export default Box