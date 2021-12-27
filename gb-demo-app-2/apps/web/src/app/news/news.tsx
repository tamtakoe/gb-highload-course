import './news.module.scss';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface NewsProps {}

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as any[]);

  useEffect(() => {
    fetch('http://localhost:3333/api/news')
      .then(response => response.json())
      .then(news => {
        setNews(news);
      })
  }, []);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
      {news.map(peaceOfNews => {
        return <li key={peaceOfNews.id}>
          <h2>{peaceOfNews.title}</h2>
          <p>{peaceOfNews.description}</p>
          <hr/>
        </li>
      })}
      </ul>
    </div>
  );
}

export default News;
