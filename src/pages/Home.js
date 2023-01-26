import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
// import Input from "../components/Input";



const Home = () => {

    return (
       <div className="home">
        <div className="container">
            <Sidebar/>
            <Chat/>
            {/* <Input/> */}

        </div>
       </div>
    )
}

export default Home;