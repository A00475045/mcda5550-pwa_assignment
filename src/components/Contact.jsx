import profilePhoto from '../public/profile-photo.jpeg'
import './Contact.css';
const Contact = () => {


    return (<>
        <div className="outlet">
            <div className="aboutme-container">
                <div className="photo-container">
                    <img className="profile-photo" src={profilePhoto} alt="Profile pic for Ranjit" />
                    <span className="photo-cover"></span>
                </div>
                <div className="para-container" style={{ width: "70vw" }}>
                    Hi there 👋, <br /> I am Ranjit Pandey. I am from Mumbai, India. There I worked as a Frontend React developer in LTIMindtree
                    <br />
                    <br />
                    I am very much interested interested in the field of Data Sciences and wanted to purse Data Science as a Career. So, I joined MCDA @ SMU
                </div>
            </div>

        </div>

    </>);
}

export default Contact;