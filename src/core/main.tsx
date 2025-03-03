import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "../components/routes/routes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <App/>
  </StrictMode>,
);
