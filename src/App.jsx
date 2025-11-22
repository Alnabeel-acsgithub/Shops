import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShopDetails from './pages/ShopDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ShopDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
