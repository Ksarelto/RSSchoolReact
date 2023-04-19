import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom/server";
import { store } from '../client/src/redux/store/store';
import App from '../client/src/App';
import { renderTemplate } from './template';
import React from 'react';

const app = express();

app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const content = renderToString(
  <Provider store={store}>
    <StaticRouter location={req.url}>
      <App/>
    </StaticRouter>
  </Provider>
  )
  
  const initStore = store.getState();

  res.send(
    renderTemplate({
      cssPath: 'main.css',
      jsPath: 'main.cjs',
      content,
      store: initStore,
    }),
  );
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
