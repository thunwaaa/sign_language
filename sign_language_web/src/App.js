import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import CheckEmail from "./routes/CheckEmail";
import Favorite from './routes/Favorite';
import Home from './routes/Home';
import SignIn from './routes/Login';
import Register from './routes/Register';
import RegisterSuccess from "./routes/RegisterSuccess";
import Translate from './routes/Translate';
import UserProfile from "./routes/UserProfile";
import Vocabulary from './routes/Vocab';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#4f46e5',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: 'white',
            },
          },
          duration: 2000,
        }}
      />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Vocabulary" element={<Vocabulary />} />
        <Route path="/Translate" element={<Translate />} />
        <Route path="/Favourite" element={<Favorite />} />
        <Route path="/RegisterSuccess" element={<RegisterSuccess />} />
        <Route path="/CheckEmail" element={<CheckEmail />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;