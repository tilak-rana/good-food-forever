import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Homepage';
import Filter from './filter';
import Details from './resDetails';
import LoginPage from './login';
import SignupPage from './signup';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/resDetails" element={<Details />} />
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignupPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
