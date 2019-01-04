/* eslint implicit-arrow-linebreak: 0 */
import '@babel/polyfill';
import { createServer } from 'http';

import app from './app';
import { connectDatabase } from './database';

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.log('could not connect to database', { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(process.env.REST_PORT, () => {
    console.log(`Server started on port :${process.env.REST_PORT}`);
  });
})();

let currentApp = app;

if (module.hot) {
  module.hot.accept('./index.js', () => {
    app.removeListener('request', currentApp);
    app.on('request', app);
    currentApp = app;
  });
}
