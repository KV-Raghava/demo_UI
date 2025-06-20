import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomeScreen1 from "./pages/HomeScreen1";
import HomeScreen from "./pages/HomeScreen";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/trace-graph":
      case pathname.startsWith("/trace-graph/"):
        title = "";
        metaDescription = "";
        break;
      case "/01-home-screen":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/trace-graph/simple" replace />} />
      <Route path="/trace-graph/:collection_id" element={<HomeScreen1 />} />
      <Route path="/01-home-screen" element={<HomeScreen />} />
    </Routes>
  );
}
export default App;
