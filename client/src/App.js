import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "scenes/layout/index.jsx";
import HomePage from "scenes/HomePage/index.jsx";
import LoginPage from "scenes/LoginPage/index.jsx";
import ComplaintPage from "scenes/complaintPage";
import MessMenu from "scenes/messMenu";

function App() {
    const isAuth = Boolean(useSelector((state) => state.token));
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route element={<Layout />}>
                        <Route
                            path="/home"
                            element={
                                // <HomePage />
                                isAuth ? <HomePage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/complaint"
                            element={
                                // <ComplaintPage />
                                isAuth ? <ComplaintPage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/menu"
                            element={
                                // <MessMenu />
                                isAuth ? <MessMenu /> : <Navigate to="/" />
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
