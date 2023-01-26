import React, { useState } from "react";
// import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { doc, setDoc } from "firebase/firestore"; 

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db} from "../config/fire";
import { Link, useNavigate } from "react-router-dom";
const Register = () =>{
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async  (e) =>{
        e.preventDefault();
         const displayName = e.target[0].value;
         const email = e.target[1].value;
         const password = e.target[2].value;
         const file= e.target[3].files[0];


        try {

            const response = await createUserWithEmailAndPassword(auth, email, password);

            console.log(response);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);
            
             uploadTask.on(
                
              (error) => {
                // Handle unsuccessful uploads
                setErr(true);
              }, 
              () => {
               getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                //   console.log('File available at', downloadURL);
                await updateProfile(response.user,{
                    displayName,
                    photoURL: downloadURL
                });

                await setDoc(doc(db, "users",response.user.uid),{
                    uid: response.user.uid,
                    displayName,
                    email,
                    photoURL:downloadURL
                });

                await setDoc(doc(db, "userChats", response.user.uid),{});
                navigate("/");

                    
                });
              }
            );


             


            
        } catch (error) {
            setErr(true);
        }

         //  const auth = getAuth()
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
    }

return(
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">iamROARe Chat World</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter full Name"/>
                <input type="email" placeholder="abc@xyz.com" />
                <input type="password" placeholder="Enter password" />
                <input style={{display:"none"}} type="file" id="file" />
                <label htmlFor="file">
                 <img className="addImage" alt="" src="https://cdn-icons-png.flaticon.com/512/6631/6631821.png" />
                 <span> Add a Pic</span>
                </label>
                <button>Sign Up</button>
                {err && <span>SOMETHING WENT WRONG</span>}

            </form>
            <p>Do have an account? <Link to="/login">Login</Link> </p>
        </div>
    </div>
)
}

export default Register;