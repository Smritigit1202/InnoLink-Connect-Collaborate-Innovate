import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header, Footer, Preloading } from "./components";
import { PrivateRoutes } from "./routes/privateRoutes";
import { useAuth } from "./contexts/Auth";
import "./App.scss";

const Home = lazy(() => import("./pages/home/home"));
const Pitch = lazy(() => import("./pages/Pitch"));
const Direct = lazy(() => import("./pages/direct/direct"));
const Profile = lazy(() => import("./pages/profile/profile"));
const Login = lazy(() => import("./pages/login/login"));
const Signup = lazy(() => import("./pages/signup/signup"));
const Ini = lazy(() => import("./pages/Ini/Ini")); // Init.jsx import kiya
const AddPost = lazy(() => import("./components/header/dropdowns/Add post")); // AddPost.jsx import kiya 
function App() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<Preloading />}>
      <Router>
        {user.loggedIn && <Header />}
        <main className="bg-neutral-50">
          <Routes>
            {/* Agar user logged in hai toh Home dikhao, warna Init pe redirect karo */}
            <Route path="/" element={user.loggedIn ? <Home /> : <Navigate to="/ini" replace />} />

            {/* Private Routes (Sirf logged in users ke liye) */}
            <Route element={<PrivateRoutes />}>
              <Route path="/direct/inbox/" exact element={<Direct />} />
              <Route path="/:username/" element={<Profile />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/accounts/login/" exact element={<Login />} />
            <Route path="/accounts/signup/" exact element={<Signup />} />

            {/* Init page (Jab user logged in nahi hoga) */}
            <Route path="/ini" exact element={<Ini />} />
            <Route path="/AddPost" exact element={<AddPost />} />
          <Route path="/profiles" exact element={<Profile />} />
          <Route path="/Pitch" exact element={<Pitch />} />
          </Routes>
        </main>
      </Router>
    </Suspense>
  );
}

export default App;
