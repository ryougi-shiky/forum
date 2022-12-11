import Home from "../components/Home";

import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";

const BaseRouter = () => {
    return (
        <BrowserRouter>
            <div>
            </div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
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

export default BaseRouter;