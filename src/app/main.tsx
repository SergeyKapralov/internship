import { createRoot } from 'react-dom/client';
import '@shared/styles/index.css';
import { Providers } from './providers';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>
);
