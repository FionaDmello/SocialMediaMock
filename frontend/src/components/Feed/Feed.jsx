import React,{ useState, useEffect, useContext } from 'react';
import './Feed.css';
import Share from '../Shared/Share';
import Post from '../Post/Post';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

export default function Feed({username}){
    
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    // fetch posts when rendering this component
    // rendering occurs whenever any state change happens within the component.
    // using [] makes useEffect run only when the feed is initially rendered.
    // whenever a state is mentioned in the array, useEffect is called when that state variable is changed
    
    // can't use async/await on top layer useEffect function. So define a wrapper function fetchPosts
    const fetchPosts = async() => {
        const response = 
        username ? 
        await axios.get(`posts/profile/${username}`)
        :
        await axios.get(`posts/timeline/${user._id}`)
        // quickfix comparisons of post dates to order them
        setPosts(response.data.sort((p1,p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
    };

    useEffect(()=>{
        // calling function to fetch posts
        fetchPosts();
    },[username]);


    return(
        <div className="feedContainer">
            <div className="feedWrapper">
                {(!username || username == user.username) && <Share onShare={() => {fetchPosts()}} />}
                {posts.map(p => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}