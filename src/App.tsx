import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./pages/Search";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
}

export default App;
