import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RelationshipPage from "./pages/relationship/RelationshipPage";
import Logout from "./pages/Logout";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            {/* All protected pages go inside */}
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relationship" element={<RelationshipPage />} />
      </Route>
    </Routes>
  );
}

export default App;
