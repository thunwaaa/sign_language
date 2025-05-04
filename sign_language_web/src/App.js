import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorite from './routes/Favorite';
import Home from './routes/Home';
import SignIn from './routes/Login';
import Register from './routes/Register';
import Translate from './routes/Translate';
import Vocabulary from './routes/Vocab';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Vocab" element={<Vocabulary />} />
        <Route path="/Translate" element={<Translate />} />
        <Route path="/Favourite" element={<Favorite />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;