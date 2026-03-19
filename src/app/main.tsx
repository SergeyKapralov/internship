import { createRoot } from 'react-dom/client';
import './index.css';
import { Providers } from './providers';
import { Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <Routes></Routes>
  </Providers>
);
