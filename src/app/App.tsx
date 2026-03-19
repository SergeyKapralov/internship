import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<div>Тут будет список фильмов</div>}></Route>
        <Route path="/movie/:id" element={<div>Тут будет страница нажатого фильма</div>}></Route>
        <Route path="/favorites" element={<div>тут будет список избранных фильмов</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
