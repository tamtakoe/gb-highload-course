import './create-news.module.scss';
import React, { ChangeEvent } from 'react';

/* eslint-disable-next-line */
export interface CreateNewsProps {}
export interface CreateNewsState {
  author: string;
  title: string;
  description: string;
  createdAt: number;
}

class CreateNews extends React.Component<
  CreateNewsProps,
  Partial<CreateNewsState>
> {
  constructor(props: CreateNewsProps) {
    super(props);
    this.state = {
      author: '',
      title: '',
      description: '',
      createdAt: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch('http://localhost:3001/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(this.state.title + ' успешно создана!');
        this.setState({
          title: '',
          description: '',
        });
      })
      .catch((error) => {
        alert('Ошибка :-(');
      });
  }

  override render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Создание новости</h1>
        <p>
          <label>
            <h4>Автор</h4>
            <input
              required
              name="author"
              type="text"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            <h4>Заголовок</h4>
            <input
              required
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            <h4>Текст</h4>
            <textarea
              required
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <input type="submit" value="Добавить" />
      </form>
    );
  }
}

export default CreateNews;
