import Title from "../components/Title"

import styles from "./Prizes.module.css"
import prizeImg from "../assets/image/prize-left.png"

function PrizeCol(props) {
    const { title, order, children } = props

    return (
        <div className="col-lg-4 mb-3">
            <div className={`p-3 h-100 ${styles.box} ${styles[order]}`}>
                <div className="text-center mb-2">
                    <Title title={title} size="sm" variant="light" />
                </div>
                <ul className={`mb-0 ${styles.prizeList}`}>
                    {children}
                </ul>
            </div>
        </div>
    )
}

function Prizes() {
    return (
        <div className={`row align-items-center mb-5 pb-5`}>
            <div className="col-lg-2 col-xl-3 order-2 order-lg-1 d-none d-lg-block">
                <img src={prizeImg} className={`position-relative m-auto d-block user-select-none pe-none ${styles.prizeImg}`} alt="Prize" />
            </div>
            <div className="col-lg-10 col-xl-9 order-1 order-lg-2">
                <h2 className="fw-bold text-center mb-5">CƠ CẤU GIẢI THƯỞNG</h2>
                <div className="row">
                    <PrizeCol title="01 GIẢI NHẤT" order="first">
                        <li>Kỷ niệm chương</li>
                        <li>
                            Quà tặng tiền mặt:<br />
                            <strong>2.000.000/tiết mục</strong>
                        </li>
                        <li>Quà tặng POSM</li>
                        <li>Giấy chứng nhận tham gia</li>
                        <li><strong>Học bổng 50% học phí</strong> chương trình Hệ Tài Năng hoặc Tú Tài Mỹ IGS</li>
                    </PrizeCol>
                    <PrizeCol title="01 GIẢI NHÌ" order="second">
                        <li>Kỷ niệm chương</li>
                        <li>
                            Quà tặng tiền mặt:<br />
                            <strong>1.500.000/tiết mục</strong>
                        </li>
                        <li>Quà tặng POSM</li>
                        <li>Giấy chứng nhận tham gia</li>
                        <li><strong>Học bổng 40% học phí</strong> chương trình Hệ Tài Năng hoặc Tú Tài Mỹ IGS</li>
                    </PrizeCol>
                    <PrizeCol title="02 GIẢI BA" order="third">
                        <li>Kỷ niệm chương</li>
                        <li>
                            Quà tặng tiền mặt:<br />
                            <strong>1.000.000/tiết mục</strong>
                        </li>
                        <li>Quà tặng POSM</li>
                        <li>Giấy chứng nhận tham gia</li>
                        <li><strong>Học bổng 30% học phí</strong> chương trình Hệ Tài Năng hoặc Tú Tài Mỹ IGS</li>
                    </PrizeCol>
                </div>
                <div className="row">
                    <p className="text-center p-3">* Tất cả các thí sinh lọt vào chung kết đều nhận được <strong>1 giấy chứng nhận tham gia</strong> chương trình <br className="d-none d-xl-inline"/> và <strong>Học bổng 30% học phí</strong> chương trình Hệ Tài Năng hoặc Tú Tài Mỹ IGS từ Nhà trường.</p>
                </div>
            </div>
        </div>
    )
}

export default Prizes