import { Route, Routes } from 'react-router-dom';
import { ListPage, MoviePage, FavoritesPage } from '@/pages';
import { Layout } from '@/widgets/layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<ListPage />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
        <Route path="/favorites" element={<FavoritesPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
