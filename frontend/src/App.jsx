import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import WorksPage from "./pages/Works";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <ScrollToTop behavior="smooth" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artistas" element={<Artists />} />
        <Route path="/artistas/:artistSlug" element={<Artists />} />
        <Route path="/trabalhos" element={<WorksPage />} />
        <Route path="/agendamento" element={<Booking />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
