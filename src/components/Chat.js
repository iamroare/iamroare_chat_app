import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/chatContext";

const Chat = () =>{

    const {data} = useContext(ChatContext)

   return(
    <div className="chat">
        <div className="chatInfo">
            <span>{data.user?.displayName}</span>
            <div className="chatIcons">
                    <img src="https://cdn-icons-png.flaticon.com/512/3913/3913243.png" alt=""/>
                    <img src="https://cdn-icons-png.flaticon.com/512/748/748137.png" alt=""/>
                    <img src="https://cdn-icons-png.flaticon.com/512/512/512142.png" alt=""/>
            </div>
        </div>
        <Messages/>

        <Input/>
    </div>
   )
}
export default Chat;

