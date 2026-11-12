import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/es/privacidad" element={<LegalPage page="privacy" locale="es" />} />
      <Route path="/en/privacy" element={<LegalPage page="privacy" locale="en" />} />
      <Route path="/es/aviso-legal" element={<LegalPage page="notice" locale="es" />} />
      <Route path="/en/legal-notice" element={<LegalPage page="notice" locale="en" />} />
      <Route path="/privacidad" element={<Navigate to="/es/privacidad" replace />} />
      <Route path="/aviso-legal" element={<Navigate to="/es/aviso-legal" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
