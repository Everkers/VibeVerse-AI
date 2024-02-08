import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { HomePage } from "./screens/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Router>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
