import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { store } from '../client/store/configureStore';
import App from '../client/app';
import { renderTemplate } from './template';
import { StoreType } from '../../public/types';

const app = express();

app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const context = {};

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  const initStore: StoreType = store.getState();
  res.send(
    renderTemplate({
      cssPath: 'main.css',
      jsPath: 'client.js',
      content,
      store: initStore,
    }),
  );
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
