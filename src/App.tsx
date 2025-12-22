import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 作ったファイルをインポート
import Home from './pages/home';
import Detail from './pages/detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;