import React,{ useState,useEffect }  from 'react'
import { MoreVert } from '@material-ui/icons';
import axios from 'axios';
import "./Post.css";
import {format} from "timeago.js";
import {Link } from 'react-router-dom';

export default function Post({ post, postUsers }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    let propValue = post;


    const [user, setUser] = useState({})
    const [like, setLike] = useState(propValue.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like +1);
        setIsLiked(!isLiked);
    }

    useEffect(()=>{
        // can't use async/await on top layer useEffect function. So define a wrapper function fetchPosts
        const fetchUser = async() => {
            const response = await axios.get(`users?userId=${propValue.userId}`);
            setUser(response.data);
        };

        // calling function to fetch posts
        fetchUser();
        // Since fetchUser within useEffect is dependent of variable propValue.userId, we have to 
        // include it in [] below. Or else, component may not behave as required
        
    },[propValue.userId])
    
    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/${user.username}`}>
                            <img src={user.profilePicture?PF+user.profilePicture: PF+"noAvatar.png"} className="postProfileImg" alt="" />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(propValue.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className="postIcon"/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{propValue?.desc}</span>
                    <img className="postCenterImg" src={PF+propValue.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="postBottomLeftImg" src={`${PF}like.png`} alt="" onClick={likeHandler}/>
                        <img className="postBottomRightImg" src={`${PF}heart.jpeg`} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{propValue?.comment} comments</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
