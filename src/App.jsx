import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"; // Commented out login functionality
// import CredentialLogin from "./pages/CredentialLogin"; // Commented out login functionality
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
    // <AuthProvider> {/* Commented out login functionality */}
      <Routes>
        <Route path="/" element={<HomeScreen1 />} /> {/* Changed to make trace-graph the landing page */}
        <Route path="/trace-graph" element={<HomeScreen1 />} />
        <Route path="/01-home-screen" element={<HomeScreen />} />
        {/* <Route path="/" element={<CredentialLogin />} /> */} {/* Commented out login functionality */}
      </Routes>
    // </AuthProvider> {/* Commented out login functionality */}
  );
}
export default App;
