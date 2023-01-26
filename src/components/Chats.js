import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../config/fire";
import {AuthContext} from "../context/authContext";
import { ChatContext } from "../context/chatContext";
const Chats = () =>{

    const [chats, setChats]= useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext)

    useEffect(()=>{
       
        const getChats = () =>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                // console.log("Current data: ", doc.data());
                setChats(doc.data());
            });

            return ()=>{
                unsub();
            };
        };

       

        currentUser.uid && getChats();
    },[currentUser.uid]);

    // console.log(Object.entries(chats));

    const handleSelect = (u) =>{
        dispatch({
            type: "CHANGE_USER",
            payload: u
        })
    }

   return(
    <div className="chats">
         {/* <div className="userChat">
            <img src="https://cdn-icons-png.flaticon.com/512/560/560277.png" alt=""/>
            <div className="userChatInfo">
                <span>Thomson</span>
                <p> hello</p>
            </div>
        </div> */}

        {/* {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) =>(
                 <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} >
                 <img src={chat[1].userInfo.photoURL} alt=""/>
                 <div className="userChatInfo">
                     <span>
                       {chat[1].userInfo.displayName} 
                     </span>
                     <p>
                        {chat[1].lastMessage?.text}
                     </p>
                 </div>
             </div>
        ))} */}

{Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
       

       
    </div>
   )
}
export default Chats;

