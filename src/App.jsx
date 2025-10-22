import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home />
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

export default App;
