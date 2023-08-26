import CreateIcon from '@mui/icons-material/Create';
import { useEffect, useState } from 'react';
import "./Feed.css"
import InputOption from './InputOption.js'
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import Post from './Post'
import { db } from './firebase';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from 'react-flip-move';
import { collection, query, orderBy, onSnapshot, serverTimestamp, addDoc, } from "firebase/firestore";

export default function Feed() {
    const user = useSelector(selectUser);

    const [input, setInput] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        onSnapshot(query((collection(db, "posts")), orderBy("timestamp", "desc")), (snapshot) =>
            setPosts(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );
    }, [])

    const sendPost = e => {
        e.preventDefault();
        try {
            addDoc(collection(db, 'posts'), {
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoURL || "",
                timestamp: serverTimestamp()
            })

            setInput('')
        } catch(e) {
            console.log(e)
        }
    }


    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text"/>
                        <button onClick={sendPost} type='submit'>Send</button>
                    </form>
                </div>
                <div className='feed_inputOptions'>
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                    <InputOption Icon={ViewDayIcon} title="Write article" color="#7FC15E"/>
                </div>
            </div>

            <FlipMove>
                {posts.map(({id, data: {name, description, message, photoUrl}}) => (
                    <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl} />
                ))}
            </FlipMove>
        </div>
    )
}