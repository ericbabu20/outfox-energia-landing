import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/es/privacidad" element={<LegalPage page="privacy" locale="es" />} />
      <Route path="/en/privacy" element={<LegalPage page="privacy" locale="en" />} />
      <Route path="/es/cookies" element={<LegalPage page="cookies" locale="es" />} />
      <Route path="/en/cookies" element={<LegalPage page="cookies" locale="en" />} />
      <Route path="/privacidad" element={<Navigate to="/es/privacidad" replace />} />
      <Route path="/cookies" element={<Navigate to="/es/cookies" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
