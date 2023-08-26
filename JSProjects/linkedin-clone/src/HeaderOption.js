import './HeaderOption.css'
import { Avatar } from "@mui/material"
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';


export default function HeaderOption({ avatar, Icon, title, onClick }) {
    
    const user = useSelector(selectUser)

    return (
        <div className="headerOption" onClick={onClick}>
            {Icon && <Icon className='headerOption__icon'/>}
            {avatar && <Avatar src={user?.photoURL} className='headerOption_icon' >{user?.email[0]}</Avatar>}
            <h3 className='headerOption__title'>{title}</h3>
        </div>
    )
}