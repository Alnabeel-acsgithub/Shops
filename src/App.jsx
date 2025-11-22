import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ShopDetails from './pages/ShopDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/:slug" element={<ShopDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
