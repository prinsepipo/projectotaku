import { Routes, Route } from "react-router";

import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import KanbanPage from "./pages/KanbanPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="kanban" element={<KanbanPage />} />
    </Routes>
  );
}

export default App;
