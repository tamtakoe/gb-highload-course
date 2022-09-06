import './news.module.scss';
import { useEffect, useState } from 'react';

const cash = new Set();

/* eslint-disable-next-line */
export interface NewsProps {}
export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as PeaceOfNews[]);
  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt)
  }

  useEffect(() => {
    fetch('http://localhost:3333/api/news')
      .then(response => response.json())
      .then(news => {
        if(!cash.has(news)){
          cash.clear();
          cash.add(news);
          setNews([]); // только для перерисовки
        } 
      });
  }, []);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
      {sortNews([...cash].flat() as PeaceOfNews[])
      .map(peaceOfNews => {
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
