import Box from "../components/Box"
import styles from "./Features.module.css"

function Features() {
    return (
        <div className="row mb-5">
            <div className="col-md-6 d-flex flex-column">
                <Box title="MỤC ĐÍCH">
                    <ul className={`mb-0 ${styles.featureList} ${styles.unStyle}`}>
                        <li><strong>Khuyến khích</strong> tài năng</li>
                        <li><strong>Tăng cường</strong> kỹ năng tiếng Anh</li>
                        <li><strong>Xây dựng tự tin</strong> và cộng đồng cùng sở thích</li>
                        <li><strong>Khám phá</strong> tiềm năng</li>
                    </ul>
                </Box>
                <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-4">
                    <div><strong>THỜI GIAN ĐĂNG KÝ</strong></div>
                    <div className={styles.time}>06.11 - 30.11</div>
                </div>
            </div>
            <div className="col-md-6">
                <Box title="ĐỐI TƯỢNG THAM GIA">
                    <ul className={`${styles.featureList} ${styles.unStyle}`}>
                        <li>Học sinh từ <strong>Tiền Tiểu học đến lớp 10</strong> trên toàn quốc, có thể đăng ký tham gia <strong>dự thi cá nhân hoặc theo nhóm</strong></li>
                    </ul>
                    <ul className={`${styles.unStyle}`}>
                        <li><span className={styles.groupName}>Bảng Kids:</span> Tiền tiểu học - Lớp 2</li>
                        <li><span className={styles.groupName}>Bảng Junior:</span> Lớp 3 - Lớp 5</li>
                        <li><span className={styles.groupName}>Bảng Senior:</span> Lớp 6 - Lớp 10</li>
                    </ul>
                    <ul className={`mb-0 ${styles.unStyle}`}>
                        <li><strong>Lưu ý:</strong> với hình thức thi theo nhóm, bảng đấu sẽ được tính theo tuổi của bạn lớn nhất</li>
                    </ul>
                </Box>
            </div>
        </div>
    )
}

export default Features