import { configureStore } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../chat/chat';

const adapter = createEntityAdapter({
  selectId: (a: IMessage) => a.createdAt,
  sortComparer: (a: IMessage, b: IMessage) =>
    a.createdAt < b.createdAt ? -1 : 1,
});

export const slice = createSlice({
  name: 'msgs',
  initialState: adapter.getInitialState({}),
  reducers: {
    add: adapter.addOne,
    remove: adapter.removeOne,
  },
});

export const { add: msgAdd, remove: msgRemove } = slice.actions;

export const store = configureStore({
  reducer: slice.reducer,
});

type RootState = ReturnType<typeof store.getState>;
export const msgsSelector = adapter.getSelectors((state: RootState) => state);
