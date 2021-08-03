import React, {useContext} from 'react';
import './TopBar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/authContext';

export default function TopBar(){

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none"}}>
                    <span className="logo">LB Social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                <Search className="searchbaricon"/>
                <input placeholder="Search for posts" className="searchinput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarlinks">
                    <div className="topbarlink"> Home Page</div>
                    <div className="topbarlink">Timeline</div>
                </div>
                <div className="topbaricons">
                    <div className="topbariconitem">
                        <Person />
                        <span className="topbariconbadge">1</span>
                    </div>
                    <div className="topbariconitem">
                        <Chat />
                        <span className="topbariconbadge">2</span>
                    </div>
                    <div className="topbariconitem">
                        <Notifications />
                        <span className="topbariconbadge">1</span>
                    </div>
                </div>
                <Link to={`/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "noAvatar.png"} alt="" className="topbarimg"/>
                </Link>
            </div>
        </div>
    )
}