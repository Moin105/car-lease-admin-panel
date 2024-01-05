import React,{useEffect,useState} from 'react';

import './styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import { Link } from 'react-router-dom';
import { useLocation ,useNavigate} from 'react-router-dom';
import sidebar_menu from '../../constants/sidebar-menu';
function DashboardHeader ({ btnText, onClick }) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    
    const [active, setActive] = useState(1);

    useEffect(() => {
        sidebar_menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname]) 

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <div className='dashbord-header-container'>
            {/* {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            } */}
        {active == 4 &&       <button onClick={()=>{handleRouteChange(`/add-blogs`)}}  className='dashbord-header-btn'>Add New Blogs</button>}
        {active == 5 &&       <button onClick={()=>{handleRouteChange(`/add-users`)}}  className='dashbord-header-btn'>Add Users</button>}
        {active == 7 &&       <button onClick={()=>{handleRouteChange(`/add-categories`)}}  className='dashbord-header-btn'>Add Categories</button>}
        {active == 9 &&       <button onClick={()=>{handleRouteChange(`/add-main-text`)}}  className='dashbord-header-btn'>Add Main Text</button>}
            <div className='dashbord-header-right'>
                <img 
                    src={NotificationIcon}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                <img
                    className='dashbord-header-avatar'
                    src='https://reqres.in/img/faces/9-image.jpg' />
            </div>
        </div>
    )
}

export default DashboardHeader;