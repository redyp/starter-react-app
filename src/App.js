import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import GetAllRecipe from './components/GetAllRecipe';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <GetAllRecipe />
      </div>

    </QueryClientProvider>
  );
}

export default App;
