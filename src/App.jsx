import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoodLab from "./pages/MoodLab";
import DebateLab from "./pages/DebateLab";
import TasteLab from "./pages/TasteLab";
import TimelineLab from "./pages/TimelineLab";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<MoodLab />} />
        <Route path="/debate" element={<DebateLab />} />
        <Route path="/taste" element={<TasteLab />} />
        <Route path="/timeline" element={<TimelineLab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;