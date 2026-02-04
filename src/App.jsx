
import NavBar from "./Components/Navbar";
import { Routes, Route } from 'react-router-dom';
import NoMatch from './Components/NoMatch';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Products';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
