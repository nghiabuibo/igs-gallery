import Title from "../components/Title"

import styles from "./Timeline.module.css"

function TimelineCol(props) {
    const { title, subtitle, children } = props
    return (
        <div className="col-lg-4">
            <div className="row align-items-center mb-3">
                <div className="col-1 col-lg-12 mb-lg-4">
                    <div className={`m-auto ${styles.dot}`}></div>
                </div>
                <div className="col-11 col-lg-12 text-lg-center d-flex d-lg-block gap-3">
                    <Title title={title} size="sm" />
                    <div className={`text-lg-center mt-1 ${styles.subTitle}`}>{subtitle}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-11 col-lg-12 offset-1 offset-lg-0">
                    <ul className={`${styles.unStyle} ${styles.customBullet} ${styles.timelineList}`}>
                        {children}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function Timeline() {
    return (
        <>
            <div className={`row mb-5 pt-4 pt-lg-0 ${styles.bgLine}`}>
                <TimelineCol title="VÒNG UNVEILING" subtitle="(6/11 - 30/11)">
                    <li>Học sinh sau khi đăng ký sẽ nhận link gửi tiết mục về Ban tổ chức, bắt buộc có 2 phần: <strong>Giới thiệu về bản thân bằng tiếng Anh và tiết mục tài năng (tối đa 10 phút)</strong></li>
                    <li>Mỗi tiết mục tham dự ở sơ loại sẽ nhận được <strong>đánh giá và lựa chọn của Hội đồng Ban Giám khảo</strong> để chọn ra chọn ra các tiết mục tốt nhất.</li>
                    <li>Thí sinh sau khi có kết quả Đạt và hoàn tất lệ phí thi <strong>(199.000đ/ thí sinh)</strong> sẽ được vào <strong>Vòng DELICACY</strong></li>
                </TimelineCol>
                <TimelineCol title="VÒNG DELICACY" subtitle="(3/12 - 10/12)">
                    <li>Học sinh kêu gọi <strong>bình chọn tại Trang Bình Chọn</strong></li>
                    <li><strong>02 bài dự thi</strong> được bình chọn cao nhất mỗi bảng sẽ được vào <strong>VÒNG CHUNG KẾT</strong></li>
                    <li>Ban tổ chức sẽ đánh giá và chọn thêm 02 bài dự thi điểm cao nhất mỗi bảng. <strong>Kết quả cuối cùng sẽ có 12 tiết mục vào VÒNG CHUNG KẾT</strong></li>
                </TimelineCol>
                <TimelineCol title="VÒNG BE THE SPOTLIGHT" subtitle="VÒNG CHUNG KẾT (17/12)">
                    <li>Các tiết mục <strong>BẮT BUỘC biểu diễn trực tiếp</strong> tại nơi tổ chức chương trình (Dự kiến ở Hồ Chí Minh hoặc Hà Nội)</li>
                    <li><strong>Cơ cấu điểm</strong> được tính theo tỷ trọng: <strong>50%</strong> điểm từ Ban Giám Khảo và <strong>50%</strong> điểm từ bình chọn qua Cổng bình chọn online của Ivy Global School được mở vào ngày Chung kết</li>
                </TimelineCol>
            </div>
            <div className="text-center mb-4">
                <Title title="CÁC SỰ KIỆN KHÁC TRONG CUỘC THI" size="sm" />
            </div>
            <div className="row mb-5 pb-5">
                <div className="col-md-6 col-lg-5 offset-lg-1 text-center">
                    <div className={`d-inline-block ${styles.customBullet}`}>
                        <Title title="09:30 - 10:30 | Chủ nhật, ngày 03/12/2023" size="xs" />
                    </div>
                    <p className="m-2"><strong>Information Day</strong></p>
                </div>
                <div className="col-md-6 col-lg-5 text-center">
                    <div className={`d-inline-block ${styles.customBullet}`}>
                        <Title title="19:30 - 21:30 | Thứ 4, ngày 6/12/2023" size="xs" />
                    </div>
                    <p className="m-2">
                        <strong>
                            Workshop online:<br />
                            "Xây dựng lòng tự tin và vượt qua nỗi sợ sân khấu"
                        </strong>
                    </p>
                    <small>*Dành cho tất cả thí sinh vào Vòng DELICACY</small>

                </div>
            </div>
        </>
    )
}

export default Timeline