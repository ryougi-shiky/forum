import {BrowserRouter, Routes, Route, useParams, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
        <div>
            
        </div>
        <Routes>
            <Route exact path="/" element={user ? <Home /> : <Register />}></Route>
            <Route exact path="/login" element={user ? <Navigate to='/' /> : <Login />}></Route>
            <Route exact path="/register" element={user ? <Navigate to='/' /> : <Register />}></Route>
            <Route path="/profile/:username" element={<Profile />}></Route>
            <Route exact path="/messenger" element= {user ? <Messenger /> : <Navigate to='/' /> }></Route>
            {/* <Route exact path="/messenger" element= { <Messenger /> }></Route> */}

            {/* <Route path="/login" element={<Login />}></Route>
            <Route path="/recordlist" element={<RecordList />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login/user/:username" element={<App />}></Route> */}
        </Routes>
        {/* <Routes>
            <Route path="*" element={<Error />}></Route>
        </Routes> */}
    </BrowserRouter>
  )
}

export default App;
