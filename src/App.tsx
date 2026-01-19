import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import EditPage from './EditPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ルートURL (/) にアクセスしたら Home を表示 */}
        <Route path="/" element={<Home />} />
        
        {/* /edit にアクセスしたら EditPage を表示 */}
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;