import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { AuthProvider } from "./state/auth/AuthContext.jsx";
import { ToastProvider } from "./state/toast/ToastContext.jsx";
import { DprProvider } from "./state/dpr/DprContext.jsx";
import { getInitialTheme, setTheme } from "./shell/theme.js";

setTheme(getInitialTheme());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DprProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </DprProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
