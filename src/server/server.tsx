import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom/server";
import { store } from '../client/src/redux/store/store';
import App from '../client/src/App';
import { Template } from './template';
import React from 'react';

const app = express();

app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const initStore = store.getState();

  const { pipe } = renderToPipeableStream(
    <Template cssPath='main.css' jsPath='main.cjs' store={initStore}>
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App/>
        </StaticRouter>
      </Provider>
    </Template>, {
      bootstrapScripts: ['/main.js'],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    }
  )
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
