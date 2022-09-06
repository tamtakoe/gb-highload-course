import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { msgAdd, msgsSelector, store } from '../store/store';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  console.log(socket.connected);
});

socket.on('disconnect', () => {
  console.log(socket.id);
  console.log(socket.connected);
});

socket.on('msgToClient', (data: IMessage) => {
  store.dispatch(msgAdd(data));
  // console.log('msgToClient ', data);
});

export interface IMessage {
  author: string;
  msg: string;
  createdAt: number;
}

/* eslint-disable-next-line */
export interface IChatProps {}

export function Chat(props: IChatProps) {
  const dispatch = useDispatch();
  const [msg, set_msg] = useState({
    author: '',
    msg: '',
    createdAt: 0,
  } as IMessage);
  const msgs = useSelector(msgsSelector.selectAll);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    set_msg({ ...msg, [event.target.name]: event.target.value });
  };

  const sebdMsg = () => {
    const m = { ...msg, createdAt: Date.now() };
    socket.emit('msgToServer', m);
    // console.log('socket.emit', socket);
  };

  return (
    <div>
      <h1>Чат</h1>
      <div style={{ border: '1px solid black' }}>
        {msgs.map((el, idx) => (
          <div key={idx}>
            <p>
              {`author: ${el.author}`}
              <br />
              {`msg: ${el.msg}`}
              <br />
              {`created: ${el.createdAt}`}
            </p>
          </div>
        ))}
      </div>
      <p>
        <label>
          <h4>author</h4>
          <input
            required
            name="author"
            type="text"
            value={msg.author}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          <h4>Текст</h4>
          <textarea
            required
            name="msg"
            value={msg.msg}
            onChange={handleChange}
          />
        </label>
      </p>
      <input type="button" value="send" onClick={sebdMsg} />
    </div>
  );
}

export default Chat;
