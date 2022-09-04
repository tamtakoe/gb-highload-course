import { ReactNode, useEffect, useState } from 'react';

export function Main() {
  const [top, setTop] = useState([] as ReactNode[]);

  useEffect(() => {
    fetch('http://localhost:3001/api/news/topAuthors')
      .then((response) => response.json())
      .then((data: string[]) => {
        const arr: ReactNode[] = [];
        for (let i = 0; i < data.length; i += 2) {
          arr.push(
            <li key={i}>
              <h2>{`author: ${data[i]}, новостей: ${data[i + 1]}`}</h2>
            </li>
          );
        }
        setTop(arr);
      });
  }, []);

  return (
    <div>
      <h1>Главная страница</h1>
      <h3>Топ авторов</h3>
      <ul>{top}</ul>
    </div>
  );
}

export default Main;
