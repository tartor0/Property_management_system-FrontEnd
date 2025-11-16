import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./pages/PropertyDetails";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<PropertyCard />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
