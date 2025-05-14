import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import CheckEmail from "./routes/CheckEmail";
import Favorite from './routes/Favorite';
import Home from './routes/Home';
import { default as Login, default as SignIn } from './routes/Login';
import Register from './routes/Register';
import RegisterSuccess from "./routes/RegisterSuccess";
import Translate from './routes/Translate';
import UserProfile from "./routes/UserProfile";
import Vocabulary from './routes/Vocab';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/Vocabulary" replace /> : <Home />}
        />
        <Route path="/Vocabulary" element={<Vocabulary />} />
        <Route path="/Translate" element={<Translate />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Favourite" element={<Favorite />} />
        <Route path="/RegisterSuccess" element={<RegisterSuccess />} />
        <Route path="/CheckEmail" element={<CheckEmail />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import Home from './routes/Home';
// import SignIn from './routes/Login';
// import Register from './routes/Register';
// import RegisterSuccess from './routes/RegisterSuccess';
// import CheckEmail from './routes/CheckEmail';
// import Vocabulary from './routes/Vocab';
// import Translate from './routes/Translate';
// import Favorite from './routes/Favorite';
// import UserProfile from './routes/UserProfile';
// import { default as Login } from './routes/Login';
// import './App.css';
/*/
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

export default App; */