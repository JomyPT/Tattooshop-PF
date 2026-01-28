import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ behavior = "auto" }) {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the path changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
