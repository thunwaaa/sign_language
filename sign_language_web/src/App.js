import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Favorite from './routes/Favorite';
import Home from './routes/Home';
import SignIn from './routes/Login';
import Register from './routes/Register';
import RegisterSuccess from "./routes/RegisterSuccess";
import Translate from './routes/Translate';
import Vocabulary from './routes/Vocab';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Vocabulary" element={<Vocabulary />} />
        <Route path="/Translate" element={<Translate />} />
        <Route path="/Favourite" element={<Favorite />} />
        <Route path="/RegisterSuccess" element={<RegisterSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;