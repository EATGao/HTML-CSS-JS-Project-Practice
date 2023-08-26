import { Avatar } from "@mui/material";
import "./Sidebar.css";
import Background from "./bck.jpg"
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

export default function Sidebar() {

    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <span className="sidebar_hash">#</span>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img src={Background} alt="background"/>
                <Avatar src={user?.photoURL} className="sidebar_avatar" >{user?.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className="sidebar_stats">
                <div className="sidebar_stat">
                    <p>Who viewed you</p>
                    <p className="sidebar_statNumber">2,222</p>
                </div>
                <div className="sidebar_stat">
                    <p>Views on post</p>
                    <p className="sidebar_statNumber">2,555</p>
                </div>    
            </div>
            <div className="sidebar_bottom">
                <p>Recent</p>
                {recentItem("react.js")}
                {recentItem("dog")}
                {recentItem("cat")}
                {recentItem("bird")}
                {recentItem("banana")}
            </div>
        </div>
    )
}