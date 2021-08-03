import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import './Profile.css'
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import RightBar from '../../components/RightBar/RightBar';
import axios from 'axios';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    // To access params in url across app
    const username = useParams().username;
    
    useEffect(()=>{
        // can't use async/await on top layer useEffect function. So define a wrapper function fetchPosts
        const fetchUser = async() => {
            const response = await axios.get(`users?username=${username}`);
            setUser(response.data);
        };
        fetchUser();
    },[username])
// 
    return (
        <>
        <TopBar/>
            <div className="profileContainer">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF+user.coverPicture : PF+"/noCover.jpeg"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture? PF+user.profilePicture : PF+"/noAvatar.png"} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar user={user}/>
                    </div>
                </div>  
            </div>
        </>
    )
}
