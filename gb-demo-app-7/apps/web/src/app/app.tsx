import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import News from './news/news';
import CreateNews from './create-news/create-news';
import { Main } from './main/main';
import Chat from './chat/chat';

export function App() {
  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/chat">Чат</Link>
          </li>
          <li>
            <Link to="/news">Новости</Link>
          </li>
          <li>
            <Link to="/create">Добавить новость</Link>
          </li>
        </ul>
      </div>

      <Routes>
        {/* <Route path="/" exact render={() => <Main />} />
        <Route path="/chat" exact render={() => <Chat />} />
        <Route path="/news" exact render={() => <News />} />
        <Route path="/create" exact render={() => <CreateNews />} /> */}
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/news" element={<News />} />
        <Route path="/create" element={<CreateNews />} />
      </Routes>
    </>
  );
}

export default App;
