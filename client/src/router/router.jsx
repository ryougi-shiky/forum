import App from "../App";
import Home from "../components/home";
import Error from "../components/error";
import Register from "../components/register";
import Login from "../components/login";
import Edit from "../components/edit";
import RecordList from "../components/recordList";
import Navbar from "../components/navbar";

import {BrowserRouter, Routes, Route} from "react-router-dom";

const BaseRouter = () => {
    return (
        
        
        <BrowserRouter>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/recordlist" element={<RecordList />}></Route>
                <Route path="/edit/:id" element={<Edit />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
            {/* <Routes>
                <Route path="*" element={<Error />}></Route>
            </Routes> */}
        </BrowserRouter>
    )
}

export default BaseRouter;