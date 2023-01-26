import { doc,onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";
import Message from "./Message";
import {db} from "../config/fire";

const Messages = () =>{
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })

        return ()=>{
            unSub();
        }
    },[data.chatId]);

    console.log(messages);

   return(
    <div className="messages" >
        {/* <Message/> */}

        {messages.map((m)=>(
             <Message message={m} key={m.id} />
        ))}
       
       

    </div>
   )
}
export default Messages;

