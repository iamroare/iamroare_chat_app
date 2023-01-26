import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./style.scss"
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return (
        <Navigate to="/login" />
      )
    }
    return children;
  }
  return (
  // <h1>hello madafaka</h1>
  // <Login/>
  // <Home/>
  <Router>
    <Routes>
      <Route  exact path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route  exact path="/login" element={<Login/>} />
      <Route  exact path="/register" element={<Register/>} />
    </Routes>
  </Router>
  // <Register/>
  );
}

export default App;
