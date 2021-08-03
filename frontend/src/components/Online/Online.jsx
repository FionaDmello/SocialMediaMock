import React from 'react'
import './Online.css'

export default function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={PF+user.profilePicture} className="rightbarProfileImg" alt=""/>
                    <span className="rightbarOnline"></span> 
                </div> 
                <span className="rightbarUsername">{user.username}</span>
            </li>
        </div>
    )
}
