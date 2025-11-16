import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider";
import { store } from "./app/store";
import "./index.css";
import App from "./App.jsx";
import "./i18n";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* 👈 Wrap entire app with Redux Provider */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter basename="/employee-grading">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);