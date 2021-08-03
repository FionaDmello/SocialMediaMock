import React, {useContext, useState, useRef} from 'react'
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import './Share.css';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

export default function Share(props) {
    const { user } = useContext(AuthContext);
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        const data = new FormData();
        if(file){
            // TO DO: to make a unique name use - Date.now()+file.name ,
            // figure out how to use the same name while saving file on server side
            const fileName = file.name
            data.append("file",file);
            data.append("name",fileName)
            // appending filepath so that we can access imgs from server 
            // based on path saved in db later
            newPost.img = fileName
        }

        try{
            await axios.post("/upload", data)
            
        }catch(err){
            console.log("Error while uploading media",err)
        }
        // Image and video files are ideally uploaded to s3 or firebase
        // but because of time constraint I'm setting it up to be uploaded on the server side
        try{
            await axios.post("/posts",newPost);
           
            // to refresh page after API call and see new post
            props.onShare();
            
        }catch(err){
            console.log("Error while creating new post",err)
        }
    }

    return (
        <div className="shareContainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"noAvatar.png"} alt="" className="shareProfileImg"/>
                    <input placeholder={`What's on your mind, ${user.username}?`} className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        {/* to make decorated text represent input field */}
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            {/* To upload one photo or video at a time */}
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg,.mp4" onChange={(e) => {setFile(e.target.files[0])}} />
                        </label>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <EmojiEmotions  htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feeling</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit"> Share </button>
                </form>
            </div>
        </div>
    )
}
