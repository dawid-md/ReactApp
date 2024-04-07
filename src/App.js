import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyTasks from './pages/MyTasks/MyTasks';

function App() {

  const [user , setUser] = useState(null)
  const [loading , setLoading] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytasks" element={<MyTasks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
