import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Screen1 from './Components/Screen1';
import Screen2 from './Components/Screen2';
import Home from './Components/Home';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/screen1" element={<Screen1 />} />
          <Route path="/screen2" element={<Screen2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
