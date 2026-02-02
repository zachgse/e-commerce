import { BrowserRouter } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import routes from './routes';
import './App.css'

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {routes()}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
