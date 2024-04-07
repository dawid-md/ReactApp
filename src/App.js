import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyTasks from './pages/MyTasks/MyTasks';

function App() {

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
