import styles from "./Logo.module.css"
import logoImg from '../assets/image/igs-logo.png'
import igLogoSvg from '../assets/svg/unlock-the-future.svg'
import gallerySvg from '../assets/svg/project-gallery.svg'

function Logo(props) {
    const { igLogo } = props

    return (
        <div className='row py-5'>
            <div className={!igLogo ? 'col-lg-6 offset-lg-3' : 'col-lg-12'}>
                <div className="row align-items-center g-0">
                    <div className="col">
                        <a href={`/`} className={`px-3 ${styles.logo}`}>
                            <img src={logoImg} className={`img-fluid`} alt="IGS Logo" />
                        </a>
                    </div>
                    {
                        igLogo &&
                        <>
                            <div className="col">
                                <a href={`/`} className={`px-3 ${styles.logo}`}>
                                    <img src={gallerySvg} className={`img-fluid ${styles.igLogoImg}`} alt="Project Gallery" />
                                </a>
                            </div>
                            <div className="col">
                                <a href={`/`} className={`px-3 ${styles.logo}`}>
                                    <img src={igLogoSvg} className={`img-fluid ${styles.igLogoImg}`} alt="Unlock Your Future" />
                                </a>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Logo