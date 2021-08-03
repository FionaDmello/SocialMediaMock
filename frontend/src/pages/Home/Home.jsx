import React, {useContext} from 'react';
import "./Home.css"
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import RightBar from '../../components/RightBar/RightBar';

export default function Home(){
    
    return(
        // react fragment to contain set of components 
        <>
            <TopBar/>
            <div className="homeContainer">
                <SideBar />
                <Feed />
                <RightBar/>
            </div> 
        </>
    )
}