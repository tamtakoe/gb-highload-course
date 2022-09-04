import './news.module.scss';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface NewsProps {}
export interface PeaceOfNews {
  // id: number,
  author: string;
  title: string;
  description: string;
  createdAt: number;
}

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as PeaceOfNews[]);
  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt);
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/news')
      .then((response) => response.json())
      .then((news) => {
        console.time('sorting');
        const sortedNews = sortNews(news);
        console.timeEnd('sorting');
        setNews(sortedNews);
      });
  }, []);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
        {news.map((peaceOfNews, idx) => {
          return (
            <li key={idx}>
              <h2>{`author: ${peaceOfNews.author}`}</h2>
              <h3>{peaceOfNews.title}</h3>
              <p>{peaceOfNews.description}</p>
              <p>{`created: ${new Date(peaceOfNews.createdAt)}`}</p>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default News;
