import { Route, Routes } from 'react-router-dom';
import { TestPage } from '@/pages';
import { Layout } from '@/widgets/layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<TestPage />}></Route>
        <Route path="/movie/:id" element={<div>Тут будет страница нажатого фильма</div>}></Route>
        <Route path="/favorites" element={<div>тут будет список избранных фильмов</div>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
