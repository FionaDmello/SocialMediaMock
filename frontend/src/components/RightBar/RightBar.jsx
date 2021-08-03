import React,{ useState,useEffect,useContext } from 'react';
import './RightBar.css';
import Online from '../Online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { Users }from '../../dummyData';

export default function RightBar({ user }){

    // In case of rightbar component called in home page, use following function definition
    const HomeRightBar = () => {
        
        return (
            <>
                <div className="birthdayContainer">
                    <img src="/assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>2 other friends</b> have a birthday today.
                    </span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    // In case of rightbar component called in Profile page, use following function definition
    const ProfileRightBar = () => {
        const PF=process.env.REACT_APP_PUBLIC_FOLDER;
        const [friends, setFriends] = useState([]);
        const {user:currentUser} = useContext(AuthContext)

        useEffect(() => {
            const getFriends = async () => {
                try{
                    const friendList = await axios.get("/users/friends/"+user._id); 
                    setFriends(friendList.data)
                }catch(err){
                    console.log("Error while fetching users friends",err)
                }
            };
            getFriends();
        },[user._id])

        return(
            <>
                <h4 className="userInfoTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Status:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1? "Single" : user.relationship === 2? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Following</h4>
                <div className="rightbarFollowingContainer">
                    {friends.map((friend)=>{
                       return( 
                        <Link to={"/"+friend.username} style={{textDecoration:"none"}}>
                            <div className="rightbarFollowing" key={friend._id}>
                                <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"noAvatar.png"} alt="" className="rightbarFollowingImg"/>
                                <span className="rightbarFollowingName" style={{textDecoration:"none"}}>{friend.username}</span>
                            </div>
                        </Link>
                        )
                    })}
                </div>
            </>
        )
    }
    return(
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {user==undefined ? <HomeRightBar />: <ProfileRightBar /> }
            </div>
        </div>
    )
}