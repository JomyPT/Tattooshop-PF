import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import WorksPage from "./pages/Works";
import Admin from "./pages/Admin";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop behavior="smooth" />
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artistas" element={<Artists />} />
        <Route path="/artistas/:artistSlug" element={<Artists />} />
        <Route path="/trabalhos" element={<WorksPage />} />
        <Route path="/agendamento" element={<Booking />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
